// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// import chalk = require("chalk");

// const chalk1 = new chalk.Chalk()

// yargs(hideBin(process.argv))
//   .command(
//     "greet <name>",
//     "Chào một người bằng tên của họ",
//     (yargs) => {
//       return yargs.positional("name", {
//         describe: "Tên người cần chào",
//         type: "string",
//       });
//     },
//     (argv) => {
//       console.log(chalk1.green(`:wave: Xin chào, ${chalk1.blue.bold(argv.name)}!`));
//     }
//   )
//   .command(
//     "warn",
//     "Hiển thị cảnh báo",
//     () => {},
//     () => {
//       console.log(chalk1.yellow.bold(":warning: Đây là một cảnh báo!"));
//     }
//   )
//   .command(
//     "error",
//     "Hiển thị lỗi",
//     () => {},
//     () => {
//       console.log(chalk1.red.bold(":x: Đã xảy ra lỗi!"));
//     }
//   )
//   .help()
//   .alias("h", "help")
//   .parse();
