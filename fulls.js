#!/usr/bin/env node
const chalk = require('chalk')
const inquirer = require('inquirer')
const npm = require('npm');

var questions = [{
  type: 'input',
  name: 'service'
  // ,
  // message: "What's your name?",
}]

CLI = () => {
  inquirer.prompt(questions).then(answers => {
    const VALUE = answers['service']
    // console.log(`${VALUE}`)

    switch (VALUE) {
      case 'frontend':
        console.log(chalk.magenta('FRONTEND...'));
        npmScript(VALUE)
        break;

      case 'backend':
        console.log(chalk.blue('BACKEND...'));
        npmScript(VALUE)
        break;

      case 'fullstack':
        console.log(chalk.blue('FULLSTACK...'));
        npmScript("backend-detached")
        npmScript("frontend")
        break;

      default:
        console.log(chalk.red('Unknown command'));
        break;
    }
    CLI();
  })
}
CLI();

// NPM SCRIPT
npmScript = (VAL) => {
  npm.load(
    {},
    (er) => {
      if (er) return;
      npm.commands.run([VAL]);
    });
}