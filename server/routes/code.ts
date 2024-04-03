import express from 'express';
import * as codeController from '@controllers/code';

const router = express.Router();

router.post('/execute', codeController.executeCode);

export default router;
