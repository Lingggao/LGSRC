#!/usr/bin/env node
/**
 * 校验 dsh-plugins/ 下每个插件包的自洽性。
 * 本地可直接 `node dsh-plugins/scripts/check.mjs`，CI 也会跑同一份。
 *
 * 检查项（都是踩过的坑）：
 *   1. package.json 必需字段与版本号格式
 *   2. files 是否把 index.js 打进去、有没有误带 node_modules
 *   3. client.js 的模块 id 必须等于包名（否则页面加载不到）
 *   4. cordis.patch.yml 里的 name 必须等于包名
 *   5. 源码里是否有硬编码的 API Key
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const base = path.resolve(here, '..');

const errors = [];
let count = 0;

for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'scripts') continue;
  const dir = path.join(base, entry.name);
  const pkgFile = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgFile)) continue;

  count += 1;
  const rel = path.relative(base, dir);
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));

    for (const key of ['name', 'version', 'files', 'exports']) {
      if (!pkg[key]) throw new Error(`package.json 缺少 ${key}`);
    }
    if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(pkg.version)) {
      throw new Error(`version 不是 x.y.z 格式：${pkg.version}`);
    }
    if (!pkg.files.includes('index.js')) throw new Error("files 必须包含 'index.js'");
    if (pkg.files.some((f) => String(f).includes('node_modules'))) {
      throw new Error('files 不应包含 node_modules');
    }

    const clientFile = path.join(dir, 'client.js');
    if (fs.existsSync(clientFile)) {
      const source = fs.readFileSync(clientFile, 'utf8');
      const id = (/id:\s*'([^']+)'/.exec(source) || [])[1];
      if (!id) throw new Error('client.js 缺少 window.__ModuleLoader__.load({ id })');
      if (id !== pkg.name) throw new Error(`client.js 的 id (${id}) 必须等于包名 (${pkg.name})`);
      if (pkg.exports['./client'] !== './client.js') {
        throw new Error("exports['./client'] 必须指向 ./client.js");
      }
    }

    const patchFile = path.join(dir, 'cordis.patch.yml');
    if (!fs.existsSync(patchFile)) throw new Error('缺少 cordis.patch.yml');
    if (!fs.readFileSync(patchFile, 'utf8').includes(`'${pkg.name}'`)) {
      throw new Error('cordis.patch.yml 里的 name 必须等于包名');
    }

    for (const file of ['index.js', 'client.js', 'README.md', 'locale/zh.json', 'locale/en.json']) {
      const target = path.join(dir, file);
      if (!fs.existsSync(target)) continue;
      const text = fs.readFileSync(target, 'utf8');
      if (/apikey\s*[:=]\s*['"][A-Za-z0-9_-]{16,}['"]/i.test(text)) {
        throw new Error(`${file} 疑似硬编码 API Key`);
      }
    }

    // 排版约定：全角括号、中英文粘连、英文括号贴字（见 README「文案约定」）
    const typography = [
      [/（|）/, '使用了全角括号，应改为半角 ()'],
      [/[\u4e00-\u9fff][A-Za-z0-9]|[A-Za-z0-9][\u4e00-\u9fff]/, '中英文之间缺少空格'],
      [/[\u4e00-\u9fff]\(|\)[\u4e00-\u9fff]/, '英文括号外侧缺少空格'],
    ];
    // 括号前后是数字或字母时同样要留空格；代码与行内代码不参与，避免误伤函数调用
    const proseRules = [
      [/[A-Za-z0-9]\(/, '英文括号前缺少空格'],
      [/\)[A-Za-z0-9]/, '英文括号后缺少空格'],
    ];
    const literalPattern = /'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"/g;
    const templatePattern = /`((?:\\.|[^`\\])*)`/g;
    const scan = (target) => {
      const isMarkdown = /\.md$/i.test(target);
      const isScript = /\.(js|mjs|cjs|ts)$/i.test(target);
      const lines = fs.readFileSync(target, 'utf8').split(/\r?\n/);
      let inFence = false;
      lines.forEach((line, index) => {
        const at = `${path.relative(dir, target)}:${index + 1}`;
        // Markdown 跳过围栏代码块与行内代码
        if (isMarkdown && /^\s*(```|~~~)/.test(line)) { inFence = !inFence; return; }
        if (isMarkdown && inFence) return;
        const proseLine = isMarkdown ? line.replace(/`[^`]*`/g, '') : line;
        for (const [pattern, message] of typography) {
          if (pattern.test(proseLine)) throw new Error(`${at} ${message}`);
        }
        for (const [pattern, message] of proseRules) {
          if (isScript) {
            // 脚本只看含中文的字符串 / 模板字面量的静态片段，函数调用与正则正文不参与
            const texts = [];
            literalPattern.lastIndex = 0;
            let match;
            while ((match = literalPattern.exec(line)) !== null) {
              texts.push(match[1] !== undefined ? match[1] : match[2]);
            }
            // 模板只检查「整行只有一对反引号且无插值」的情况：嵌套模板里混着代码，无法可靠区分
            const backticks = (line.match(/`/g) || []).length;
            if (backticks === 2 && !line.includes('${')) {
              templatePattern.lastIndex = 0;
              while ((match = templatePattern.exec(line)) !== null) texts.push(match[1]);
            }
            const hit = texts.some((value) => /[\u4e00-\u9fff]/.test(value) && pattern.test(value));
            if (hit) throw new Error(`${at} ${message}`);
          } else if (pattern.test(proseLine)) {
            throw new Error(`${at} ${message}`);
          }
        }
      });
    };
    for (const name of ['index.js', 'client.js', 'README.md', 'CHANGELOG.md', 'locale/zh.json', 'locale/en.json']) {
      const target = path.join(dir, name);
      if (fs.existsSync(target)) scan(target);
    }

    console.log(`ok   ${rel.padEnd(24)} ${pkg.name}@${pkg.version}`);
  } catch (error) {
    errors.push(`${rel}: ${error.message}`);
    console.log(`FAIL ${rel.padEnd(24)} ${error.message}`);
  }
}

if (count === 0) console.log('dsh-plugins/ 下没有发现插件包');

if (errors.length > 0) {
  console.error(`\n${errors.length} 个问题待修复`);
  process.exit(1);
}
console.log(`\n全部通过（${count} 个插件）`);
