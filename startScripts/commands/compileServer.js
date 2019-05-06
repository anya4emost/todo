const {spawnSync} = require('child_process');
const path = require('path');

module.exports = () => {
  const ts = spawnSync('tsc', {cwd: path.join(process.cwd(), './server')});

  console.log(ts.stdout.toString());

  if (ts.status !== 0) {
    process.exit(1);
  }
};
