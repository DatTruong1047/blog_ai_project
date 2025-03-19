import { exec } from 'child_process';

import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';
const prisma = new PrismaClient();


async function runPrismaCommand(command) {
  return new Promise((resolve, rejects) => {
    exec(command, (error, stdout) => {
      if (error) {
        rejects(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

export async function init() {
  try {
    // Kiem tra kết noi
    // const chalk = await loadChalk();
    console.log(chalk.blue('Connect to database ...'));
    await prisma.$connect();
    console.log(chalk.green('Connect successful'));

    // Chay migration
    console.log(chalk.yellow('Running prisma migrations ...'));
    await runPrismaCommand('npx prisma migrate deploy');
    console.log(chalk.green('Prisma migrations completed'));

    // Tạo Prisma Client
    console.log(chalk.yellow('Generating Prisma Client...'));
    await runPrismaCommand('npx prisma generate');
    console.log(chalk.green('Prisma Client generated.'));
  } catch (error) {
    console.error(chalk.red('Connect DB error:', error.message));
  } finally {
    await prisma.$disconnect();
  }
}
