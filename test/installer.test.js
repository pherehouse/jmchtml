'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { main, parseArgs, resolveTarget } = require('../bin/jmchtml.js');

test('parses multiple agents and project scope', () => {
  const options = parseArgs(['install', '--agent', 'trae,qoder', '--project']);
  assert.deepEqual(options.agents, ['trae', 'qoder']);
  assert.equal(options.scope, 'project');
});

test('resolves TRAE and Qoder project directories', () => {
  const base = path.join(os.tmpdir(), 'jmchtml-project');
  assert.equal(
    resolveTarget('trae-cli', { scope: 'project', projectRoot: base }),
    path.join(base, '.traecli', 'skills', 'jmchtml')
  );
  assert.equal(
    resolveTarget('qoder', { scope: 'project', projectRoot: base }),
    path.join(base, '.qoder', 'skills', 'jmchtml')
  );
});

test('installs files and backs up an existing installation', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'jmchtml-test-'));
  try {
    assert.equal(main(['install', '--agent', 'codex', '--global', '--home', home]), 0);
    const target = path.join(home, '.codex', 'skills', 'jmchtml');
    assert.equal(fs.existsSync(path.join(target, 'SKILL.md')), true);
    assert.equal(fs.existsSync(path.join(target, 'assets', 'jmc-ford-logo.png')), true);

    fs.writeFileSync(path.join(target, 'old.txt'), 'old');
    assert.equal(main(['install', '--agent', 'codex', '--global', '--home', home, '--force']), 0);
    const backups = fs.readdirSync(path.dirname(target)).filter((name) => name.startsWith('.jmchtml.backup-'));
    assert.equal(backups.length, 1);
    assert.equal(fs.existsSync(path.join(path.dirname(target), backups[0], 'old.txt')), true);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('rejects project installation for QoderWork', () => {
  assert.throws(
    () => resolveTarget('qoderwork', { scope: 'project', projectRoot: process.cwd() }),
    /does not expose a documented project-level/
  );
});

test('resolves WorkBuddy user-level directory', () => {
  const home = path.join(os.tmpdir(), 'jmchtml-home');
  assert.equal(
    resolveTarget('workbuddy', { scope: 'global', home }),
    path.join(home, '.workbuddy', 'skills', 'jmchtml')
  );
});

test('all project install fails preflight before writing any target', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jmchtml-project-'));
  try {
    assert.equal(main(['install', '--agent', 'all', '--project', '--project-root', projectRoot]), 1);
    assert.equal(fs.existsSync(path.join(projectRoot, '.codex', 'skills', 'jmchtml')), false);
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
});

test('prints version without installing', () => {
  assert.equal(main(['--version']), 0);
});
