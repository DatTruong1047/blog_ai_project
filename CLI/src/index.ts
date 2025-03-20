#!/usr/bin/env node
import ansicolor from 'ansicolor';
import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as crawlCLI from './commands/crawl.comand';
import { ArgumentsCrawl } from './commands/crawl.comand';

const convertToArgumentsCrawl = (argv: Arguments): ArgumentsCrawl => {
  const url: string = typeof argv.url === 'string' ? argv.url : '';
  const style: string = typeof argv.style === 'string' ? argv.style : 'article';
  const category: string = typeof argv.category === 'string' ? argv.category : 'news';

  if (!url) {
    console.log(ansicolor.red('URL is not valid'));
  }

  const newArgv: ArgumentsCrawl = { url, style, category };
  return newArgv;
};

yargs(hideBin(process.argv))
  .command(
    'crawl <url>',
    'crawl content',
    (yargs) => {
      return yargs
        .positional('url', {
          describe: 'URL của website cần crawl',
          type: 'string',
        })
        .option('style', {
          describe: 'Phong cách của bài viết',
          type: 'string',
        })
        .option('category', {
          describe: 'Danh mục của bài viết',
          type: 'string',
        });
    },
    (argv: Arguments) => {
      const newArgv: ArgumentsCrawl = convertToArgumentsCrawl(argv);
      crawlCLI.handler(newArgv);
    }
  )
  .help()
  .alias('h', 'help')
  .parse();
