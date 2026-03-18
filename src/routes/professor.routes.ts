import { Router } from 'express';
import { ProfessorController } from '../controllers/professor.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createProfessorSchema, updateProfessorSchema, professorParamsSchema } from '../schemas/professor.schema.js';
import { z } from 'zod';

const router = Router();
const controller = new ProfessorController();

// Schema combinado para validação completa

const ListarSchema = z.object({
    query: z.object({}),
    params: z.object({}),
    body: z.object({})
});

const BuscarSchema = z.object({
    params: professorParamsSchema,
    query: z.object({}),
    body: z.object({})
});

const CriarSchema = z.object({
    body: createProfessorSchema,
    params: z.object({}),
    query: z.object({})
});

const AtualizarSchema = z.object({
    params: professorParamsSchema,
    body: updateProfessorSchema,
    query: z.object({})
});

const DeletarSchema = z.object({
    params: professorParamsSchema,
    query: z.object({}),
    body: z.object({})
});

// Rotas com validação
router.get('/professores', validate(ListarSchema), controller.getAll);
router.get('/professores/:id', validate(BuscarSchema), controller.getById);
router.post('/professores', validate(CriarSchema), controller.create);
router.put('/professores/:id', validate(AtualizarSchema), controller.update);
router.delete('/professores/:id', validate(DeletarSchema), controller.delete);

export default router;