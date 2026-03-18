import { Router } from 'express';
import { AlunoController } from '../controllers/aluno.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createAlunoSchema, updateAlunoSchema, alunoParamsSchema } from '../schemas/aluno.schema.js';
import { z } from 'zod';

const router = Router();
const controller = new AlunoController();

// Schema combinado para validação completa
const listarSchema = z.object({
  query: z.object({}),
  params: z.object({}),
  body: z.object({})
});

const buscarSchema = z.object({
  params: alunoParamsSchema,
  query: z.object({}),
  body: z.object({})
});

const criarSchema = z.object({
  body: createAlunoSchema,
  params: z.object({}),
  query: z.object({})
});

const atualizarSchema = z.object({
  params: alunoParamsSchema,
  body: updateAlunoSchema,
  query: z.object({})
});

const deletarSchema = z.object({
  params: alunoParamsSchema,
  query: z.object({}),
  body: z.object({})
});

// Rotas com validação
router.get('/alunos', validate(listarSchema), controller.getAll);
router.get('/alunos/:id', validate(buscarSchema), controller.getById);
router.post('/alunos', validate(criarSchema), controller.create);
router.put('/alunos/:id', validate(atualizarSchema), controller.update);
router.delete('/alunos/:id', validate(deletarSchema), controller.delete);

export default router;