import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/http-exception.js';

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('❌ Erro:', err);

  if (err instanceof HttpException) {
    return res.status(err.status).json({
      error: err.message,
      details: err.details
    });
  }

  // Erro não tratado
  res.status(500).json({
    error: 'Erro interno do servidor'
  });
};