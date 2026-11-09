const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
assert.ok(scripts.length > 0, 'Editor script missing');
for (const [, source] of scripts) new vm.Script(source);
assert.ok(!/<script[^>]+src\s*=/i.test(html), 'External script found');
console.log('Embedded JavaScript syntax OK');
