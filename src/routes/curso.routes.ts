import { Router } from "express";
import { CursoController } from "../controllers/curso.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createCursoSchema, updateCursoSchema, cursoParamsSchema } from "../schemas/curso.js";
import { z } from "zod";

const router = Router();
const controller = new CursoController();

// Schema combinado para validação completa
const listarSchema = z.object({
    query: z.object({}),
    params: z.object({}),
    body: z.object({}),
});

const buscarSchema = z.object({
    params: cursoParamsSchema,
    query: z.object({}),
    body: z.object({}),
});

const criarSchema = z.object({
    body: createCursoSchema,
    params: z.object({}),
    query: z.object({}),
});

const atualizarSchema = z.object({
    params: cursoParamsSchema,
    body: updateCursoSchema,
    query: z.object({}),
});

const deletarSchema = z.object({
    params: cursoParamsSchema,
    query: z.object({}),
    body: z.object({}),
});

// Rotas com validação
router.get("/cursos", validate(listarSchema), controller.getAll);
router.get("/cursos/:id", validate(buscarSchema), controller.getById);
router.post("/cursos", validate(criarSchema), controller.create);
router.put("/cursos/:id", validate(atualizarSchema), controller.update);
router.delete("/cursos/:id", validate(deletarSchema), controller.delete);

export default router;