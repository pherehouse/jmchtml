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
- **跨 Agent**：遵循 `SKILL.md` 开放格式；支持主流 Agent，也能通过提示词安装到其他 Agent。
- **安装可回滚**：内置零依赖安装器；覆盖已有版本前自动创建备份。
- **适合真实汇报**：兼顾浏览器播放、键盘翻页、全屏、打印和 Obsidian HTML Reader。

## 安装

### 方式一：Skills CLI（推荐）

交互选择目标 Agent：

```bash
npx skills add pherehouse/jmchtml
```

指定 Agent 并安装到用户级目录（把 `codex` 换成你的 Agent）：

```bash
npx skills add pherehouse/jmchtml -s jmchtml -a codex -g -y
```

标准目录 `skills/jmchtml/` 已用 Skills CLI 实测，可正确发现，并且安装结果只包含运行所需的 `SKILL.md`、`assets/` 与 `agents/`。

### 方式二：让 Agent 自己安装

把下面这段提示词发给任意具备文件和终端权限的 Agent：

```text
请安装 GitHub 仓库 https://github.com/pherehouse/jmchtml 中的 jmchtml Skill。
先检查仓库内容，再把 skills/jmchtml/ 整个目录复制到你支持的用户级
Skills 目录。若目标已存在，先创建带时间戳的备份，
不要直接覆盖。安装后验证 SKILL.md 的 YAML frontmatter，并告诉我实际安装路径
以及如何触发它。不要执行仓库中与安装无关的脚本。
```

## 兼容性

方式一适用于 Skills CLI 支持的 Agent，包括 Codex、Claude Code、Cursor、Gemini CLI、GitHub Copilot、TRAE 和 Qoder。

WorkBuddy、QoderWork、TraeCode CLI 或其他 Agent，直接使用方式二，让 Agent 把 `skills/jmchtml/` 整个目录安装到它的 Skills 目录即可。

## 更新

通过 Skills CLI 安装：

```bash
npx skills update jmchtml
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
