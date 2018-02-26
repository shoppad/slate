const execSync = require('child_process').execSync;
const path = require('path');

const config = require('../../slate-tools.config');

module.exports = async function(options = {}) {
  const executable = config.paths.eslint.bin;
  const cachePath = path.join(config.paths.cache, 'eslint-scripts');
  const extensions = ['.js'];
  const ignorePatterns = ['dist', 'node_modules'].reduce(
    (buffer, pattern) => `${buffer} --ignore-pattern ${pattern}`,
    '',
  );
  const {runFixer} = options;
  const fixer = runFixer ? '--fix' : '';

  try {
    execSync(
      // prettier-ignore
      `${JSON.stringify(executable)} . ${extensions} ${ignorePatterns} ` +
        `${fixer} --max-warnings 0 ` +
        `--cache true --cache-location ${JSON.stringify(`${cachePath}${path.sep}`)}`,
      {stdio: 'inherit'},
    );
  } catch (error) {
    // console.log(`\nESLint errors found. Run 'yarn run sewing-kit format'.\n`);
    // console.error(error);
    // process.exit(1);
  }
};
