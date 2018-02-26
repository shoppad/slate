const {execSync, exec} = require('child_process');
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');

const config = require('../../slate-tools.config');

module.exports = async function(options = {}) {
  const executable = config.paths.prettier.bin;
  const extensions = `./**/*.{${['js', 'scss', 'json', 'css'].join(',')}}`;

  try {
    await promisify(exec)(
      `${JSON.stringify(executable)} '${extensions}' --list-different`,
    );
  } catch (error) {
    if (typeof error.stdout !== 'string') {
      throw error;
    }

    displayExpected(executable, error.stdout.trim().split('\n'));
  }
};

function displayExpected(executable, pathsWithErrors) {
  pathsWithErrors.forEach(path => {
    if (fs.existsSync(path)) {
      const expected = execSync(
        `${JSON.stringify(executable)} '${path}'`,
      ).toString();

      console.log(`${path} expected:\n${expected}`);
    } else {
      console.log(path);
    }
  });
}
