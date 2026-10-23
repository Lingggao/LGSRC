#!/usr/bin/env node
/**
 * 从插件的 CHANGELOG.md 中抽取指定版本的说明，用于 gh release create --notes-file。
 * 找不到对应版本时输出空内容，调用方退回自动生成的说明。
 *
 * 用法：node dsh-plugins/scripts/release-notes.mjs <插件目录名> <版本号>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [plugin, version] = process.argv.slice(2);

if (!plugin || !version) {
  console.error('用法：node release-notes.mjs <插件目录名> <版本号>');
  process.exit(1);
}

const file = path.resolve(here, '..', plugin, 'CHANGELOG.md');
if (!fs.existsSync(file)) process.exit(0);

const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
let collecting = false;
const collected = [];

for (const line of lines) {
  const heading = /^##\s+(\S+)/.exec(line);
  if (heading) {
    if (collecting) break;
    if (heading[1] === version) {
      collecting = true;
      continue;
    }
  }
  if (collecting) collected.push(line);
}

const text = collected.join('\n').trim();
if (text) process.stdout.write(`${text}\n`);
