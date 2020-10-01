import { exec } from 'child_process';
import { join } from 'path';

test('All files should be formatted', async () => {
  let out = '';
  let err;

  try {
    out = await new Promise((resolve, reject) =>
      exec(
        `prettier --list-different '**/*.{js,json,jsx}' '!dist' && prettier-tslint check '**/*.{ts,tsx}' '!dist'`,
        {
          cwd: join(__dirname, '..'),
          encoding: 'utf-8'
        },
        (err, stdout, stderr) => {
          let out = stdout + stderr;
          if (err && !out) {
            if (!out) {
              return reject(err);
            }
            out += err.message;
          }
          return resolve(out);
        }
      )
    );
  } catch (e) {
    err = e;
  }

  expect(err).toBe(undefined);
  expect(out.toString()).toBe('');
}, 25000);
