import { z } from 'zod';

export const uploadCode = z.object({
  body: z.object({
    language: z.string({ required_error: 'Language is required' }),
    code: z.string({ required_error: 'Code is required' }),
    input: z.string({ required_error: 'Input is required' })
  })
});
