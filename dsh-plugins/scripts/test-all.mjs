// 一键测试：清单校验 + UI 一致性审计 + 各插件渲染冒烟
// 用法：node dsh-plugins/scripts/test-all.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const repo = path.resolve(root, '..');

const steps = [];
const run = (label, script, args = []) => {
  process.stdout.write(`\n=== ${label} ===\n`);
  try {
    const out = execFileSync(process.execPath, [script, ...args], { cwd: repo, encoding: 'utf8' });
    process.stdout.write(out);
    steps.push({ label, ok: true });
  } catch (error) {
    process.stdout.write(String(error.stdout || ''));
    process.stderr.write(String(error.stderr || ''));
    steps.push({ label, ok: false });
  }
};

run('清单与排版校验', path.join(root, 'scripts', 'check.mjs'));
run('UI 一致性审计', path.join(root, 'scripts', 'ui-audit.mjs'));

const plugins = fs.readdirSync(root)
  .map((n) => path.join(root, n))
  .filter((d) => fs.existsSync(path.join(d, 'package.json')));
for (const dir of plugins) {
  const name = path.basename(dir);
  const smoke = path.join(root, 'tests', `${name}-render-smoke.mjs`);
  if (fs.existsSync(smoke)) run(`渲染冒烟：${name}`, smoke);
}

const failed = steps.filter((s) => !s.ok);
console.log('\n=== 汇总 ===');
for (const s of steps) console.log(`${s.ok ? 'ok  ' : 'FAIL'} ${s.label}`);
if (failed.length) {
  console.error(`\n${failed.length} 项未通过，先修再 push`);
  process.exit(1);
}
console.log('\n全部通过，可以 push');
