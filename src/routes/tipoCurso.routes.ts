import { Router } from "express";
import { TipoCursoController } from "../controllers/tipoCurso.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createTipoCursoSchema, updateTipoCursoSchema, tipoCursoParamsSchema } from "../schemas/tipoCurso.schema.js";
import { z } from "zod";

const router = Router();
const controller = new TipoCursoController();

// Schema combinado para validação completa
const listarSchema = z.object({
    query: z.object({}),
    params: z.object({}),
    body: z.object({}),
});

const buscarSchema = z.object({
    params: tipoCursoParamsSchema,
    query: z.object({}),
    body: z.object({}),
});

const criarSchema = z.object({
    body: createTipoCursoSchema,
    params: z.object({}),
    query: z.object({}),
});

const atualizarSchema = z.object({
    params: tipoCursoParamsSchema,
    body: updateTipoCursoSchema,
    query: z.object({}),
});

const deletarSchema = z.object({
    params: tipoCursoParamsSchema,
    query: z.object({}),
    body: z.object({}),
});

// Rotas com validação

router.get("/tipos-curso", validate(listarSchema), controller.getAll);
router.get("/tipos-curso/:id", validate(buscarSchema), controller.getById);
router.post("/tipos-curso", validate(criarSchema), controller.create);
router.put("/tipos-curso/:id", validate(atualizarSchema), controller.update);
router.delete("/tipos-curso/:id", validate(deletarSchema), controller.delete);

export default router;