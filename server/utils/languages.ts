import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { writeFile, rm } from 'fs';
import ErrorResponse from './errorResponse';
import path from 'path';

enum Language {
  PYTHON,
  CPP,
  JAVA,
  JS
}

const languageMapping = (arg: string): Language => {
  if (arg === 'python') return Language.PYTHON;
  if (arg === 'cpp') return Language.CPP;
  if (arg === 'java') return Language.JAVA;
  if (arg === 'javascript') return Language.JS;
  throw new ErrorResponse('Unsupported Language', 400);
};

type CodeExecutionOutput = {
  output: string;
  time: number;
};

const codeExecuteEngine = (
  language: Language,
  code: string,
  input: string
): Promise<CodeExecutionOutput> => {
  return new Promise((resolve, reject) => {
    if (language === Language.PYTHON) {
      const tmpFile = path.join(__dirname, '../', `${uuidv4()}.py`);
      const command = `python ${tmpFile}`;

      writeFile(tmpFile, code, err => {
        if (err) {
          reject(new ErrorResponse('Internal Server Error', 500));
          return;
        }

        const start = performance.now();

        const child = exec(command, async (error, stdout, stderr) => {
          rm(tmpFile, err => {
            if (err) {
              reject(new ErrorResponse('Internal Server Error', 500));
              return;
            }

            const end = performance.now();

            error !== null
              ? resolve({ output: stderr, time: end - start })
              : resolve({ output: stdout, time: end - start });
          });
        });

        child.stdin?.write(input);
        child.stdin?.end();
      });
    } else if (language === Language.CPP) {
      const randomId = uuidv4();
      const tmpFile = path.join(__dirname, '../', `${randomId}.cpp`);
      const executableFile = path.join(__dirname, '../', `${randomId}.exe`);
      const command = `g++ ${tmpFile} -o ${randomId}.exe && ${randomId}.exe`;

      writeFile(tmpFile, code, err => {
        const start = performance.now();

        if (err) {
          reject(new ErrorResponse('Internal Server Error', 500));
          return;
        }

        const child = exec(command, async (error, stdout, stderr) => {
          rm(tmpFile, err => {
            if (err) {
              reject(new ErrorResponse('Internal Server Error', 500));
              return;
            }

            rm(executableFile, err => {
              if (err) {
                reject(new ErrorResponse('Internal Server Error', 500));
                return;
              }

              const end = performance.now();

              error !== null
                ? resolve({ output: stderr, time: end - start })
                : resolve({ output: stdout, time: end - start });
            });
          });
        });

        child.stdin?.write(input);
        child.stdin?.end();
      });
    } else if (language == Language.JAVA) {
      const tmpFile = path.join(__dirname, '../', `Main.java`);
      const classFile = path.join(__dirname, '../', `Main.class`);
      const command = `javac Main.java && java Main`;

      writeFile(tmpFile, code, err => {
        const start = performance.now();

        if (err) {
          reject(new ErrorResponse('Internal Server Error', 500));
          return;
        }

        const child = exec(command, async (error, stdout, stderr) => {
          rm(tmpFile, err => {
            if (err) {
              reject(new ErrorResponse('Internal Server Error', 500));
              return;
            }

            rm(classFile, err => {
              if (err) {
                console.log(err);
                reject(new ErrorResponse('Internal Server Error', 500));
                return;
              }

              const end = performance.now();

              error !== null
                ? resolve({ output: stderr, time: end - start })
                : resolve({ output: stdout, time: end - start });
            });
          });
        });

        child.stdin?.write(input);
        child.stdin?.end();
      });
    } else if (language == Language.JS) {
      const tmpFile = path.join(__dirname, '../', `${uuidv4()}.js`);
      const command = `node ${tmpFile}`;

      writeFile(tmpFile, code, err => {
        if (err) {
          reject(new ErrorResponse('Internal Server Error', 500));
          return;
        }

        const start = performance.now();

        const child = exec(command, async (error, stdout, stderr) => {
          rm(tmpFile, err => {
            if (err) {
              reject(new ErrorResponse('Internal Server Error', 500));
              return;
            }

            const end = performance.now();

            error !== null
              ? resolve({ output: stderr, time: end - start })
              : resolve({ output: stdout, time: end - start });
          });
        });

        child.stdin?.write(input);
        child.stdin?.end();
      });
    } else {
      reject(new ErrorResponse('Unsupported Language', 400));
    }
  });
};

export { Language, languageMapping, codeExecuteEngine };
