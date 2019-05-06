const {spawnSync} = require('child_process');
const path = require('path');

module.exports = (env = {}) => {
  const proc = spawnSync('node', [path.join(process.cwd(), '.next-server/server.js')],
    {
      env: {
        ...process.env,
        ...env,
      },
      cwd: process.cwd(),
      stdio: [process.stdin, process.stdout, process.stderr],
    }
  );

  if (proc.status !== 0) {
    process.exit(proc.status);
  }
};
