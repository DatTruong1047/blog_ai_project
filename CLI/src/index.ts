#!/usr/bin/env node
import ansicolor from 'ansicolor';
import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as intCLI from './commands/init.command';

yargs(hideBin(process.argv))
  .command(
    'init',
    'init DB',
    (yargs) => {
      return yargs.option('db', {
        describe: 'database',
        type: 'string',
      });
    },
    () => {
      intCLI.handler();
    }
  )
  .help()
  .alias('h', 'help')
  .parse();
