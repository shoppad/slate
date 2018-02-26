const fs = require('fs');
const argv = require('yargs').argv;

const runEslint = require('../../tools/eslint');
const runStylelint = require('../../tools/stylelint');
const runPrettierLint = require('../../tools/prettier');
const config = require('../../slate-tools.config');

const {scripts, styles} = argv;

if (scripts) {
  if (fs.existsSync(config.paths.eslint.rc)) {
    runEslint();
  } else {
    console.log();
  }
}

if (styles) {
  if (fs.existsSync(config.paths.stylelint.rc)) {
    runStylelint();
  }
}

// await runPrettierLint();
