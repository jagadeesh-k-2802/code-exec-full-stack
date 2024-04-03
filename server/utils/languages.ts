import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { writeFile, rm } from 'fs';
import ErrorResponse from './errorResponse';
import path from 'path';

enum Language {
  PYTHON
}

const languageMapping = (arg: string): Language => {
  if (arg === 'python') return Language.PYTHON;
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
    } else {
      reject(new ErrorResponse('Unsupported Language', 400));
    }
  });
};

export { Language, languageMapping, codeExecuteEngine };
