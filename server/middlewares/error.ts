import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import ErrorResponse from '@utils/errorResponse';
import { fromZodError } from 'zod-validation-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message.red);

  let error = { ...err };
  error.message = err.message;

  // Zod Validation Error
  if (err instanceof ZodError) {
    const validationError = fromZodError(err, {
      includePath: false,
      issueSeparator: '\n',
      maxIssuesInMessage: 3,
      prefix: '',
      prefixSeparator: ''
    });

    error = new ErrorResponse(validationError.toString(), 400);
  }

  res.status(error.statusCode ?? 500).json({
    success: false,
    error: error.message ?? 'Internal Server Error'
  });
};

export default errorHandler;
