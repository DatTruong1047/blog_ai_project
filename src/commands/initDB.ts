// import { exec } from 'child_process';

// import * as app from '../app';

// async function loadChalk() {
//   const { default: chalk } = await import('chalk');
//   return chalk;
// }

// async function runPrismaCommand(command) {
//   return new Promise((resolve, rejects) => {
//     exec(command, (error, stdout) => {
//       if (error) {
//         rejects(error);
//       } else {
//         resolve(stdout);
//       }
//     });
//   });
// }

// async function init() {
//   try {
//     // Kiem tra kết noi
//     const chalk = await loadChalk();
//     console.log(chalk.blue('Connect to database ...'));
//     await app.prisma.$connect();
//     console.log(chalk.green('Connect successful'));

//     // Chay migration
//     console.log(chalk.yellow('Running prisma migrations ...'));
//     await runPrismaCommand('npx prisma migrate deploy');
//     console.log(chalk.green('Prisma migrations completed'));

//     // Tạo Prisma Client
//     console.log(chalk.yellow('Generating Prisma Client...'));
//     await runPrismaCommand('npx prisma generate');
//     console.log(chalk.green('Prisma Client generated.'));
//   } catch (error) {
//     const chalk = await loadChalk();
//     console.error(chalk.red('Connect DB error:', error.message));
//   } finally {
//     await app.prisma.$disconnect();
//   }
// }

// export default init;
