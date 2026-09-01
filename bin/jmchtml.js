#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { version: PACKAGE_VERSION } = require('../package.json');

const SKILL_NAME = 'jmchtml';
const SOURCE_ROOT = path.resolve(__dirname, '..', 'skills', SKILL_NAME);
const COPY_ENTRIES = ['SKILL.md', 'assets', 'agents'];

const AGENTS = {
  universal: { global: ['.agents', 'skills'], project: ['.agents', 'skills'] },
  codex: { global: ['.codex', 'skills'], project: ['.codex', 'skills'] },
  claude: { global: ['.claude', 'skills'], project: ['.claude', 'skills'] },
  cursor: { global: ['.cursor', 'skills'], project: ['.cursor', 'skills'] },
  gemini: { global: ['.gemini', 'skills'], project: ['.gemini', 'skills'] },
  copilot: { global: ['.copilot', 'skills'], project: ['.github', 'skills'] },
  trae: { global: ['.trae', 'skills'], project: ['.trae', 'skills'] },
  'trae-cn': { global: ['.trae-cn', 'skills'], project: ['.trae', 'skills'] },
  'trae-cli': { global: ['.traecli', 'skills'], project: ['.traecli', 'skills'] },
  qoder: { global: ['.qoder', 'skills'], project: ['.qoder', 'skills'] },
  'qoder-cn': { global: ['.qoder-cn', 'skills'], project: ['.qoder', 'skills'] },
  qoderwork: { global: ['.qoderwork', 'skills'], project: null },
  workbuddy: { global: ['.workbuddy', 'skills'], project: null }
};

function printHelp() {
  console.log(`jmchtml installer

Usage:
  jmchtml install [options]

Options:
  --agent <name[,name]>  Target agent (default: universal)
  --global               Install for the current user (default)
  --project              Install into the current project
  --force                Back up and replace an existing installation
  --dry-run              Show targets without writing files
  --home <path>          Override the home directory (useful in CI)
  --project-root <path>  Override the project root
  -v, --version          Show installer version
  -h, --help             Show this help

Agents:
  ${Object.keys(AGENTS).join(', ')}, all
`);
}

function parseArgs(argv) {
  const result = {
    command: 'install',
    agents: ['universal'],
    scope: 'global',
    force: false,
    dryRun: false,
    home: os.homedir(),
    projectRoot: process.cwd(),
    version: false,
    help: false
  };

  const args = [...argv];
  if (args[0] && !args[0].startsWith('-')) {
    result.command = args.shift();
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--agent') {
      const value = args[++i];
      if (!value) throw new Error('--agent requires a value');
      result.agents = value.split(',').map((item) => item.trim()).filter(Boolean);
    } else if (arg === '--global') {
      result.scope = 'global';
    } else if (arg === '--project') {
      result.scope = 'project';
    } else if (arg === '--force') {
      result.force = true;
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg === '--home') {
      const value = args[++i];
      if (!value) throw new Error('--home requires a path');
      result.home = path.resolve(value);
    } else if (arg === '--project-root') {
      const value = args[++i];
      if (!value) throw new Error('--project-root requires a path');
      result.projectRoot = path.resolve(value);
    } else if (arg === '-h' || arg === '--help') {
      result.help = true;
    } else if (arg === '-v' || arg === '--version') {
      result.version = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (result.agents.includes('all')) {
    result.agents = Object.keys(AGENTS);
  }
  result.agents = [...new Set(result.agents)];
  return result;
}

function resolveTarget(agent, options) {
  const config = AGENTS[agent];
  if (!config) {
    throw new Error(`Unsupported agent: ${agent}. Run with --help to list supported agents.`);
  }

  const segments = config[options.scope];
  if (!segments) {
    throw new Error(`${agent} does not expose a documented ${options.scope}-level Skills directory.`);
  }

  const base = options.scope === 'global' ? options.home : options.projectRoot;
  return path.join(base, ...segments, SKILL_NAME);
}

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace('.', '-').replace('T', '-').replace('Z', '');
}

function installOne(agent, options) {
  const target = resolveTarget(agent, options);
  console.log(`${options.dryRun ? '[dry-run] ' : ''}${agent}: ${target}`);
  if (options.dryRun) return { agent, target, changed: false };

  fs.mkdirSync(path.dirname(target), { recursive: true });

  if (fs.existsSync(target)) {
    if (!options.force) {
      throw new Error(`${target} already exists. Re-run with --force to back it up and replace it.`);
    }
    const backup = path.join(path.dirname(target), `.${SKILL_NAME}.backup-${timestamp()}`);
    fs.renameSync(target, backup);
    console.log(`  backup: ${backup}`);
  }

  fs.mkdirSync(target, { recursive: true });
  for (const entry of COPY_ENTRIES) {
    const source = path.join(SOURCE_ROOT, entry);
    if (!fs.existsSync(source)) continue;
    fs.cpSync(source, path.join(target, entry), { recursive: true });
  }

  const installedSkill = path.join(target, 'SKILL.md');
  if (!fs.existsSync(installedSkill)) {
    throw new Error(`Installation verification failed: ${installedSkill} was not created.`);
  }
  return { agent, target, changed: true };
}

function main(argv = process.argv.slice(2)) {
  try {
    const options = parseArgs(argv);
    if (options.help) {
      printHelp();
      return 0;
    }
    if (options.version) {
      console.log(PACKAGE_VERSION);
      return 0;
    }
    if (options.command !== 'install') {
      throw new Error(`Unknown command: ${options.command}`);
    }

    // Preflight every destination before changing any of them.
    options.agents.forEach((agent) => resolveTarget(agent, options));
    const results = options.agents.map((agent) => installOne(agent, options));
    if (!options.dryRun) {
      console.log(`Installed ${SKILL_NAME} for ${results.length} target(s). Start a new agent session or reload Skills.`);
    }
    return 0;
  } catch (error) {
    console.error(`jmchtml: ${error.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main();
}

module.exports = { AGENTS, installOne, main, parseArgs, resolveTarget };
