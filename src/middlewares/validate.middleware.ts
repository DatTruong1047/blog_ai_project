import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('Params:', req.params);
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
