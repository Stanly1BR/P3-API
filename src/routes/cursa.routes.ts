import { Router } from "express";
import { CursaController } from "../controllers/cursa.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createCursaSchema, updateCursaSchema, cursaParamsSchema } from "../schemas/cursa.schema.js";
import { z } from "zod";

const router = Router();
const controller = new CursaController();

const listarSchema = z.object({
  query: z.object({}),
  params: z.object({}),
  body: z.object({}),
});

const buscarSchema = z.object({
  params: cursaParamsSchema,
  query: z.object({}),
  body: z.object({}),
});

const criarSchema = z.object({
  body: createCursaSchema,
  params: z.object({}),
  query: z.object({}),
});

const atualizarSchema = z.object({
  params: cursaParamsSchema,
  body: updateCursaSchema,
  query: z.object({}),
});

const deletarSchema = z.object({
  params: cursaParamsSchema,
  query: z.object({}),
  body: z.object({}),
});

router.get("/cursas", validate(listarSchema), controller.getAll);
router.get("/cursas/:id_aluno/:id_disciplina", validate(buscarSchema), controller.getById);
router.post("/cursas", validate(criarSchema), controller.create);
router.put("/cursas/:id_aluno/:id_disciplina", validate(atualizarSchema), controller.update);
router.delete("/cursas/:id_aluno/:id_disciplina", validate(deletarSchema), controller.delete);

export default router;
