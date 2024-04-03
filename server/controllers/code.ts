import catchAsync from '@utils/catchAsync';
import { zParse } from '@validation/index';
import { languageMapping, codeExecuteEngine } from '@utils/languages';
import * as codeValidation from '@validation/code';

/**
 * @route GET /api/code/execute
 * @desc Execute User Code
 */
export const executeCode = catchAsync(async (req, res) => {
  const { body } = await zParse(codeValidation.executeCode, req);
  const { code, input, language } = body;
  const languageType = languageMapping(language);
  const output = await codeExecuteEngine(languageType, code, input);
  res.status(200).json(output);
});
