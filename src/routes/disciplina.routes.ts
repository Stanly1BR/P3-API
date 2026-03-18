import  {Router} from 'express';
import { DisciplinaController } from '../controllers/disciplina.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createDisciplinaSchema, updateDisciplinaSchema, disciplinaParamsSchema } from '../schemas/disciplina.schema.js';
import { z } from 'zod';

const router = Router();
const controller = new DisciplinaController();

// Schema combinado para validação completa
const listarSchema = z.object({
  query: z.object({}),
  params: z.object({}),
  body: z.object({})
});

const buscarSchema = z.object({
  params: disciplinaParamsSchema,
  query: z.object({}),
  body: z.object({})
});

const criarSchema = z.object({
  body: createDisciplinaSchema,
  params: z.object({}),
  query: z.object({})
});

const atualizarSchema = z.object({
  params: disciplinaParamsSchema,
  body: updateDisciplinaSchema,
  query: z.object({})
});

const deletarSchema = z.object({
  params: disciplinaParamsSchema,
  query: z.object({}),
  body: z.object({})
});

// Rotas com validação
router.get('/disciplinas', validate(listarSchema), controller.getAll);
router.get('/disciplinas/:id', validate(buscarSchema), controller.getById);
router.post('/disciplinas', validate(criarSchema), controller.create);
router.put('/disciplinas/:id', validate(atualizarSchema), controller.update);
router.delete('/disciplinas/:id', validate(deletarSchema), controller.delete);

export default router;