// #!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { init } from './initDatabase.mjs';
// import { required } from 'yargs';
// const database = require('./initDatabase');
yargs(hideBin(process.argv))
  .command(
    'init',
    'Khoi tao cau hinh va ket noi DB',
    (yargs) => {
      return yargs.option('db', {
        alias: 'database',
        describe: 'Cấu hình kết nối database',
        type: 'string',
      });
    },
    async () => {
      init();
      console.log(`log`);
    }
  )
  .help().argv;
