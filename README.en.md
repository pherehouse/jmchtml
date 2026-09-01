# jmchtml

![jmchtml Agent Skill](docs/hero.svg)

`jmchtml` is an Agent Skill for creating polished, book-like HTML presentation decks for enterprise reporting. It defines a reusable page structure, design tokens, branded navigation, fullscreen behavior, print rules, and a delivery checklist.

## Quick install

With the Agent Skills CLI:

```bash
npx skills add pherehouse/jmchtml -s jmchtml -a codex -g -y
```

Replace `codex` with `claude-code`, `cursor`, `gemini-cli`, `github-copilot`, `trae`, `trae-cn`, `qoder`, or any other target supported by the Skills CLI.

GitHub CLI can preview, install, pin, and update the Skill:

```bash
gh skill preview pherehouse/jmchtml jmchtml
gh skill install pherehouse/jmchtml jmchtml --agent codex --scope user
```

For WorkBuddy, QoderWork, and TraeCode CLI, use the repository's zero-dependency fallback installer. It also supports `qoder-cn`:

```bash
npx --yes github:pherehouse/jmchtml install --agent workbuddy --global
```

Gemini CLI also supports native repository installation:

```bash
gemini skills install https://github.com/pherehouse/jmchtml --path skills/jmchtml
```

## Use

```text
Use jmchtml to turn the Markdown report in this directory into an offline,
single-file HTML presentation. Include the floating table of contents,
progress navigation, keyboard controls, logo fullscreen toggle, and print styles.
```

The Skill is written in Chinese because its primary use case is Chinese enterprise reporting. Agents that can follow Chinese instructions can use it directly.

## Supported agents

OpenAI Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, TRAE, TraeCode CLI, Qoder CLI, QoderWork, WorkBuddy, and agents that discover the shared `.agents/skills` directory.

See the [Chinese README](README.md) for the full compatibility matrix, installation prompt, safety notes, and project details.

## License and trademarks

Code and documentation are released under the [MIT License](LICENSE). JMC, Ford, and related marks remain the property of their respective owners. The bundled logo asset is not separately licensed under MIT; replace it when you do not have permission to use the brand. See [NOTICE](NOTICE).
