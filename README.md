# jmchtml

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-SKILL.md-0A79C3)](https://agentskills.io/)
[![CI](https://github.com/pherehouse/jmchtml/actions/workflows/ci.yml/badge.svg)](https://github.com/pherehouse/jmchtml/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0FA3B1.svg)](LICENSE)
[![No dependencies](https://img.shields.io/badge/dependencies-0-036AA2)](package.json)

![jmchtml 书页式 HTML 演示文稿设计系统](docs/hero.svg)

面向企业汇报场景的书页式 HTML 演示文稿 Skill。它把封面、内容页、结束页、品牌色、悬浮目录、圆点导航、进度条和全屏交互整理成一套可复用的设计系统，让 AI Agent 能稳定生成具有统一视觉与交互体验的单文件 HTML 演示。

[English](README.en.md) · [安装](#安装) · [使用](#使用) · [兼容性](#兼容性) · [参与贡献](CONTRIBUTING.md)

## 为什么值得用

- **不是一段临时提示词**：包含明确的页面结构、设计令牌、交互规则和交付检查清单。
- **可离线交付**：品牌素材随仓库提供，不依赖个人图床或临时链接。
- **跨 Agent**：遵循 `SKILL.md` 开放格式；借助 Skills CLI 可安装到 70+ Agent，并对 Codex、Claude Code、Cursor、Gemini CLI、GitHub Copilot、TRAE、TraeCode CLI、Qoder、QoderWork 与 WorkBuddy 给出明确入口。
- **安装可回滚**：内置零依赖安装器；覆盖已有版本前自动创建备份。
- **适合真实汇报**：兼顾浏览器播放、键盘翻页、全屏、打印和 Obsidian HTML Reader。

## 安装

### 方式一：Skills CLI（推荐）

交互选择目标 Agent：

```bash
npx skills add pherehouse/jmchtml
```

指定 Agent 并安装到用户级目录：

```bash
# Codex
npx skills add pherehouse/jmchtml -s jmchtml -a codex -g -y

# Claude Code
npx skills add pherehouse/jmchtml -s jmchtml -a claude-code -g -y

# Cursor
npx skills add pherehouse/jmchtml -s jmchtml -a cursor -g -y

# Gemini CLI
npx skills add pherehouse/jmchtml -s jmchtml -a gemini-cli -g -y

# GitHub Copilot
npx skills add pherehouse/jmchtml -s jmchtml -a github-copilot -g -y

# TRAE / TRAE 中国版
npx skills add pherehouse/jmchtml -s jmchtml -a trae -g -y
npx skills add pherehouse/jmchtml -s jmchtml -a trae-cn -g -y

# Qoder / Qoder 中国版
npx skills add pherehouse/jmchtml -s jmchtml -a qoder -g -y
npx skills add pherehouse/jmchtml -s jmchtml -a qoder-cn -g -y
```

一次安装到多个 Agent：

```bash
npx skills add pherehouse/jmchtml -s jmchtml -g -y \
  -a codex -a claude-code -a cursor -a gemini-cli -a trae -a qoder
```

去掉 `-g` 即安装到当前项目。也可以先试用，不写入 Skill 目录：

```bash
npx skills use pherehouse/jmchtml -s jmchtml -a codex
```

标准目录 `skills/jmchtml/` 已用 Skills CLI 实测，可正确发现，并且安装结果只包含运行所需的 `SKILL.md`、`assets/` 与 `agents/`。

### 方式二：GitHub CLI

先预览，再安装：

```bash
gh skill preview pherehouse/jmchtml jmchtml
gh skill install pherehouse/jmchtml jmchtml --agent codex --scope user
```

固定到特定发布版本：

```bash
gh skill install pherehouse/jmchtml jmchtml --agent codex --scope user --pin v1.0.0
```

`gh skill` 目前仍是 GitHub CLI 的预览功能。它支持 Codex、Claude Code、Cursor、Gemini CLI、Copilot、TRAE、Qoder 等大量 Agent，并会写入来源元数据，方便后续更新。

### 方式三：产品原生安装与补充适配

Gemini CLI 可以直接从 GitHub 安装：

```bash
gemini skills install https://github.com/pherehouse/jmchtml --path skills/jmchtml
```

WorkBuddy、QoderWork、TraeCode CLI 或需要明确目录控制时，使用仓库内置的零依赖安装器：

```bash
# WorkBuddy
npx --yes github:pherehouse/jmchtml install --agent workbuddy --global

# QoderWork
npx --yes github:pherehouse/jmchtml install --agent qoderwork --global

# TraeCode CLI
npx --yes github:pherehouse/jmchtml install --agent trae-cli --global
```

安装器还支持这些目标：

```text
universal, codex, claude, cursor, gemini, copilot,
trae, trae-cn, trae-cli, qoder, qoder-cn, qoderwork, workbuddy, all
```

安装到当前项目时将 `--global` 换成 `--project`。运行下面命令查看备份覆盖、预演和自定义根目录等选项：

```bash
npx --yes github:pherehouse/jmchtml --help
```

手动安装时，把 `skills/jmchtml/` 整个目录复制到对应的 Skill 目录。不要只复制 `SKILL.md`，否则默认 Logo 资产不可用。

### 方式四：让 Agent 自己安装

把下面这段提示词发给任意具备文件和终端权限的 Agent：

```text
请安装 GitHub 仓库 https://github.com/pherehouse/jmchtml 中的 jmchtml Skill。
先检查仓库内容，再把 skills/jmchtml/ 整个目录复制到你支持的用户级
Skills 目录。若目标已存在，先创建带时间戳的备份，
不要直接覆盖。安装后验证 SKILL.md 的 YAML frontmatter，并告诉我实际安装路径
以及如何触发它。不要执行仓库中与安装无关的脚本。
```

## 兼容性

| Agent | Skills CLI `-a` | 仓库安装器 `--agent` | 用户级目录 |
|---|---|---|---|
| OpenAI Codex | `codex` | `codex` | `~/.codex/skills/jmchtml` |
| Claude Code | `claude-code` | `claude` | `~/.claude/skills/jmchtml` |
| Cursor | `cursor` | `cursor` | `~/.cursor/skills/jmchtml` |
| Gemini CLI | `gemini-cli` | `gemini` | `~/.gemini/skills/jmchtml` |
| GitHub Copilot | `github-copilot` | `copilot` | `~/.copilot/skills/jmchtml` |
| TRAE | `trae` | `trae` | `~/.trae/skills/jmchtml` |
| TRAE 中国版 | `trae-cn` | `trae-cn` | `~/.trae-cn/skills/jmchtml` |
| TraeCode CLI | — | `trae-cli` | `~/.traecli/skills/jmchtml` |
| Qoder CLI | `qoder` | `qoder` | `~/.qoder/skills/jmchtml` |
| Qoder 中国版 | `qoder-cn` | `qoder-cn` | `~/.qoder-cn/skills/jmchtml` |
| QoderWork | — | `qoderwork` | `~/.qoderwork/skills/jmchtml` |
| WorkBuddy | — | `workbuddy` | `~/.workbuddy/skills/jmchtml` |
| 开放通用目录 | `universal` | `universal` | `~/.agents/skills/jmchtml` |

不同产品版本的 Skill 发现机制可能变化。安装后请新开会话，或使用产品提供的刷新/重载 Skills 功能。

目录信息参考各产品官方文档：[Claude Code](https://code.claude.com/docs/en/skills)、[Cursor](https://cursor.com/docs/skills)、[Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/using-agent-skills.md)、[GitHub Copilot](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)、[TraeCode CLI](https://docs.trae.cn/cli_skills)、[Qoder CLI](https://docs.qoder.com/cli/Skills) 与 [QoderWork](https://docs.qoder.com/qoderwork/skills)。WorkBuddy 使用 `~/.workbuddy/skills/`，也可以在产品的 Skills 界面导入完整 Skill 文件夹。

## 更新

通过 Skills CLI 安装：

```bash
npx skills update jmchtml
```

通过 GitHub CLI 安装：

```bash
gh skill update jmchtml --dry-run
gh skill update jmchtml
```

## 使用

安装后直接描述任务，Agent 会根据 Skill 描述自动选择它；也可以显式点名：

```text
使用 jmchtml，把这份季度经营复盘做成 8 页书页式 HTML 演示。
保留 JMC 蓝青色系，最后一页只做收尾，不放业务结论。
```

```text
使用 $jmchtml，根据当前目录的 Markdown 汇报材料生成可离线打开的单文件 HTML。
需要顶部目录、底部进度、键盘翻页、Logo 点击全屏和打印样式。
```

典型交付结构：

```text
封面 → 内容页 × N → 结束页
```

总结、对比和结论必须放在倒数第二页或更早的内容页；最后一页只承担视觉收尾。

## 项目结构

```text
jmchtml/
├── skills/jmchtml/
│   ├── SKILL.md              # Skill 主入口
│   ├── assets/
│   │   └── jmc-ford-logo.png # 离线品牌素材
│   └── agents/
│       └── openai.yaml       # Codex UI 元数据
├── bin/
│   └── jmchtml.js            # 零依赖跨 Agent 安装器
├── test/
│   └── installer.test.js
└── .github/workflows/ci.yml
```

## 安全与品牌说明

Skill 本身不读取凭据、不访问外部 API，也不会在安装时执行网络脚本。来自互联网的任何 Skill 都应先审查再安装。

`JMC`、`Ford` 及相关标识属于各自权利人。仓库中的品牌素材不因 MIT License 获得额外商标授权；如果用于其他组织、公开模板或商业分发，请替换为你有权使用的品牌素材。详见 [NOTICE](NOTICE)。

## 分享与贡献

如果它帮你省下了一次从零搭建演示框架的时间，欢迎 Star、分享给需要做汇报的同事，或提交你验证过的兼容性改进。贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。
