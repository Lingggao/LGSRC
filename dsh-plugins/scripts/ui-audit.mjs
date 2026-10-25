// UI 一致性审计：扫描 dsh-plugins/ 下每个插件的界面源码
// 用法：node dsh-plugins/scripts/ui-audit.mjs [插件目录名]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const arg = process.argv[2];

const dirs = arg
  ? [path.join(root, arg)]
  : fs.readdirSync(root).map((n) => path.join(root, n)).filter((d) => fs.existsSync(path.join(d, 'package.json')));

let failed = 0;
let checked = 0;

for (const dir of dirs) {
  const clientFile = path.join(dir, 'client.js');
  if (!fs.existsSync(clientFile)) continue;
  checked += 1;

  const lines = fs.readFileSync(clientFile, 'utf8').split(/\r?\n/);
  const problems = [];
  const report = [];

  const scan = (regex, label, allowed, allowLine = () => false) => {
    const hits = [];
    lines.forEach((line, i) => {
      const re = new RegExp(regex.source, 'g');
      let m;
      while ((m = re.exec(line)) !== null) {
        if (allowLine(line, m)) continue;
        if (allowed && !allowed.includes(m[1])) hits.push({ line: i + 1, value: m[1], text: line.trim().slice(0, 100) });
      }
    });
    report.push({ label, count: hits.length });
    hits.forEach((h) => problems.push(`[${label}] 行 ${h.line}: ${h.value} ← ${h.text}`));
  };

  // 字号只剩两档；间距与圆角只用令牌值
  scan(/fontSize: '(\d+px)'/g, '字号', ['12px', '16px']);
  scan(/font-size:(\d+px)/g, '字号(CSS)', ['12px', '16px']);
  scan(/borderRadius: '([^']+)'/g, '圆角', ['8px', '10px', '12px', '999px', '50%', '4px']);
  scan(/gap: '(\d+px)'/g, '间距', ['4px', '6px', '8px', '12px']);
  // 颜色必须来自主题令牌，唯一的例外是徽章上的白色文字
  scan(/color: '#([0-9a-fA-F]{3,8})'/g, '写死颜色', null, (line) => /#fff\b|#FFFFFF/i.test(line));

  const rawButtons = lines.filter((l, i) => /h\('button'/.test(l) && !/className: 'tb-btn'/.test(lines.slice(i, i + 4).join(' ')));
  report.push({ label: '原生 button', count: rawButtons.length });
  if (rawButtons.length) problems.push(`[原生 button] ${rawButtons.length} 处绕过 Btn 组件`);

  lines.forEach((line, i) => {
    if (!/h\('input'/.test(line)) return;
    const block = lines.slice(i, i + 8).join(' ');
    if (!/aria-label|aria-labelledby|htmlFor|id: 'tb-/.test(block)) {
      problems.push(`[输入框可访问性] 行 ${i + 1}: 缺少无障碍名称或关联 label`);
    }
  });

  const name = path.basename(dir);
  if (problems.length) {
    failed += 1;
    console.log(`FAIL ${name}`);
    problems.forEach((p) => console.log('  ' + p));
  } else {
    console.log(`ok   ${name.padEnd(22)} ${report.map((r) => `${r.label} ${r.count}`).join(' / ')}`);
  }
}

if (checked === 0) console.log('dsh-plugins/ 下没有带 client.js 的插件');
if (failed) { console.error(`\n${failed} 个插件存在 UI 一致性问题`); process.exit(1); }
console.log('\nUI 一致性审计通过');
