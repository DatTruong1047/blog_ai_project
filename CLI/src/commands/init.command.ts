import { exec } from 'child_process';

import { PrismaClient } from '@prisma/client';
import ansicolor from 'ansicolor';

const prisma = new PrismaClient();

async function runPrismaCommand(command: string) {
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

export const handler = async () => {
  try {
    console.log(ansicolor.blue('Connect to database ...'));
    await prisma.$connect();
    console.log(ansicolor.green('Connect successful'));

    // Chay migration
    console.log(ansicolor.yellow('Running prisma migrations ...'));
    await runPrismaCommand('npx prisma migrate deploy');
    console.log(ansicolor.green('Prisma migrations completed'));

    // Tạo Prisma Client
    console.log(ansicolor.yellow('Generating Prisma Client...'));
    await runPrismaCommand('npx prisma generate');
    console.log(ansicolor.green('Prisma Client generated.'));
  } catch (error) {
    console.error(ansicolor.red(`Connect DB error: ${error.message}`));
  } finally {
    await prisma.$disconnect();
  }
};
