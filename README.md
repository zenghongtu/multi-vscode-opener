# multi-vscode-opener [![npm](https://img.shields.io/npm/v/multi-vscode-opener.svg)](https://www.npmjs.com/package/multi-vscode-opener)

multi-vscode-opener is a command line tool to open VSCode with stand-alone user data and extensions.

## Installation

```bash
npm install -g multi-vscode-opener
```

You can also run `npx multi-vscode-opener` to use it directly.

## Usage

```bash
mvo
```

This command will list all config for VSCode (stand-alone user data and extensions), then you can select which config to use.

To use a specific config, run:

```bash
mvo [config name]
```

![preview](assets/preview.gif)

## License

MIT
