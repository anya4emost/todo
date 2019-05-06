const {spawnSync} = require('child_process');

module.exports = () => {
  const proc = spawnSync('next', ['build']);

  console.log(proc.stdout.toString());

  if (proc.status !== 0) {
    process.exit(1);
  }
};
