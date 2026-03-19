import { Router } from "express";
import { LecionaController } from "../controllers/leciona.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createLecionaSchema, updateLecionaSchema, lecionaParamsSchema } from "../schemas/Leciona.schema.js";
import { z } from "zod";

const router = Router();
const controller = new LecionaController();

const listarSchema = z.object({
  query: z.object({}),
  params: z.object({}),
  body: z.object({}),
});

const buscarSchema = z.object({
  params: lecionaParamsSchema,
  query: z.object({}),
  body: z.object({}),
});

const criarSchema = z.object({
  body: createLecionaSchema,
  params: z.object({}),
  query: z.object({}),
});

const atualizarSchema = z.object({
  params: lecionaParamsSchema,
  body: updateLecionaSchema,
  query: z.object({}),
});

const deletarSchema = z.object({
  params: lecionaParamsSchema,
  query: z.object({}),
  body: z.object({}),
});

router.get("/lecionas", validate(listarSchema), controller.getAll);
router.get("/lecionas/:id_professor/:id_disciplina", validate(buscarSchema), controller.getById);
router.post("/lecionas", validate(criarSchema), controller.create);
router.put("/lecionas/:id_professor/:id_disciplina", validate(atualizarSchema), controller.update);
router.delete("/lecionas/:id_professor/:id_disciplina", validate(deletarSchema), controller.delete);

export default router;
