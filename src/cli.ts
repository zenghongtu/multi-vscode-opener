#!/usr/bin/env node

import commander from 'commander';
import { startInteractiveRun, startRun } from './index';

commander
  .version(require('../package.json').version)
  .arguments('[config name]')
  .action((name: string) => {
    if (name) {
      startRun(name);
    } else {
      startInteractiveRun();
    }
  })
  .parse(process.argv);
