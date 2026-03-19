import { Router } from "express";
import { z } from "zod";
import { validate } from "../middlewares/validation.middleware.js";
import { TituloController } from "../controllers/titulo.controller.js";
import {
  createTituloSchema,
  updateTituloSchema,
  tituloParamsSchema,
} from "../schemas/titulo.schema.js";

export const router = Router();
const controller = new TituloController();

// Schema combinado para validação completa

const listarSchema = z.object({
  query: z.object({}),
  params: z.object({}),
  body: z.object({}),
});

const buscarSchema = z.object({
  params: tituloParamsSchema,
  query: z.object({}),
  body: z.object({}),
});

const criarSchema = z.object({
  body: createTituloSchema,
  params: z.object({}),
  query: z.object({}),
});

const atualizarSchema = z.object({
  body: updateTituloSchema,
  params: tituloParamsSchema,
  query: z.object({}),
});

const deletarSchema = z.object({
  params: tituloParamsSchema,
  query: z.object({}),
  body: z.object({}),
});

// Rotas com validação

router.get("/titulos", validate(listarSchema), controller.getAll);
router.get("/titulos/:id", validate(buscarSchema), controller.getById);
router.post("/titulos", validate(criarSchema), controller.create);
router.put("/titulos/:id", validate(atualizarSchema), controller.update);
router.delete("/titulos/:id", validate(deletarSchema), controller.delete);

export default router;