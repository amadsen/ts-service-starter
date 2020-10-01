const { spawn } = require('child_process');
const path = require('path');

const dcspawn = (args) =>
  new Promise((resolve, reject) => {
    let done = false;
    let outStr = '';
    let errStr = '';

    const cp = spawn(
      'docker-compose',
      ['-f', path.join(__dirname, 'docker-compose-4-tests.yaml')].concat(args),
      {
        windowsHide: true
      }
    );

    cp.stderr.on('data', (d) => {
      errStr += d;
    });

    cp.stdout.on('data', (d) => {
      outStr += d;
    });

    cp.on('error', (e) => {
      done = true;
      console.error('Failed to run docker-compose with args:', args);
      return reject(e);
    });

    cp.on('exit', (code, signal) => {
      if (done) {
        return;
      }
      done = true;
      if (code !== 0) {
        console.error(
          'Non-zero exit code running docker-compose with args:',
          args
        );
        const err = new Error(`Non-zero exit code: ${code}\n${errStr}`);
        err.stdout = outStr;
        err.stderr = errStr;
        err.code = code;

        return reject(err);
      }

      return resolve({
        stdout: outStr,
        stderr: errStr
      });
    });
  });

module.exports = dcspawn;
