import { v4 as uuidv4 } from 'uuid';
import catchAsync from '@utils/catchAsync';
import { zParse } from '@validation/index';
import { queue, getQueueChannel } from '@config/queue';
import db from '@config/db';
import * as codeValidation from '@validation/code';

/**
 * @route GET /api/code/upload
 * @desc Upload User Code to Job
 */
export const uploadCode = catchAsync(async (req, res) => {
  const { body } = await zParse(codeValidation.uploadCode, req);
  const { code, input, language } = body;
  const uniqueId = uuidv4();
  const data = { id: uniqueId, code, input, language };
  const channel = await getQueueChannel();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  res.status(200).json({ success: true, id: uniqueId });
});

/**
 * @route GET /api/code/:id
 * @desc Fetch status of code execution
 */
export const getExecutionStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const database = await db();
  const output = database.data.jobs[id];

  if (output === undefined) {
    res.status(200).json({ success: true, isDone: false });
  } else {
    res.status(200).json({ success: true, isDone: true, ...output });
  }
});
