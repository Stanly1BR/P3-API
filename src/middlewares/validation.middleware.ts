import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { HttpException } from '../utils/http-exception.js';

export const validate = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar body, params e query (forçar objetos vazios em GET sem corpo)
      await schema.parseAsync({
        body: req.body ?? {},
        params: req.params ?? {},
        query: req.query ?? {}
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((e) => ({
          campo: e.path.join('.'),
          mensagem: e.message
        }));
        next(new HttpException(400, 'Erro de validação', errors));
      } else {
        next(error);
      }
    }
  };
};