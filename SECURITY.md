# Security Policy

## Reporting a vulnerability

请不要在公开 Issue 中披露可被利用的安全问题。请通过 GitHub 仓库所有者公开的联系方式私下报告，并提供影响范围、复现步骤和建议修复方式。

## Installation safety

本项目的安装器只复制 `SKILL.md`、`assets/` 和 `agents/`。它不下载额外代码、不读取凭据，也不修改 Agent 配置文件。使用 `--force` 时，旧目录会先被重命名为带时间戳的备份。

安装任何第三方 Skill 前，都应审查其指令、脚本、外部请求与所需权限。

