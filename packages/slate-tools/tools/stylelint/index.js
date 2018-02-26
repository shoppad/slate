const execSync = require('child_process').execSync;
const path = require('path');

const config = require('../../slate-tools.config');

module.exports = async function(options = {}) {
  const executable = config.paths.stylelint.bin;
  const ignorePatterns = ['dist', 'node_modules'].reduce(
    (buffer, pattern) => `${buffer} --ignore-pattern ${pattern}`,
    '',
  );

  try {
    execSync(`${JSON.stringify(executable)} . ${ignorePatterns}`, {
      stdio: 'inherit',
    });
  } catch (error) {}
};
