#!/usr/bin/env node
import ansicolor from 'ansicolor';
import yargs, { Arguments, argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as listCLI from './commands/list.command';

yargs(hideBin(process.argv))
  .command(
    'list',
    'Lay danh sach cac bai viet',
    (yargs) => {
      return yargs
        .option('skip', {
          describe: 'Bo qua n phan tu',
          type: 'number',
        })
        .option('take', {
          describe: 'Bo qua n phan tu',
          type: 'number',
        })
        .option('style', {
          describe: 'Tim kiem theo style',
          type: 'string',
        });
    },
    (argv: Arguments) => {
      listCLI.handler(argv);
    }
  )
  .help()
  .alias('h', 'help')
  .parse();
