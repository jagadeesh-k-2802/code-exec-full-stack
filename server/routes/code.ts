import express from 'express';
import * as codeController from '@controllers/code';

const router = express.Router();

router.post('/upload', codeController.uploadCode);
router.post('/status/:id', codeController.getExecutionStatus);

export default router;
