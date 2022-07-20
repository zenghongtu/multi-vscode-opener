#!/usr/bin/env node

import commander from 'commander';
import { startInteractiveRun, startRun } from './index';

const pkg = require('../package.json');

const program = new commander.Command();

program
	.name('mvo')
	.description(pkg.description)
	.version(pkg.version, '-v, --version', 'output the current version')
	.usage('[config-name]');

program
	.arguments('[config-name]')
	.action((name: string) => {
		if (name) {
			startRun(name);
		} else {
			startInteractiveRun();
		}
	})
	.parse(process.argv);
