import { Router } from "express";
import { InstituicaoController } from "../controllers/instituicao.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createInstituicaoSchema, updateInstituicaoSchema, instituicaoSchema } from "../schemas/instituicao.schema.js";
import { z} from "zod";

const router = Router();
const controller = new InstituicaoController();

// Schema combinado para validação completa

const ListarSchema = z.object({
    query: z.object({}),
    params: z.object({}),
    body: z.object({}),
});

const BuscarSchema = z.object({
    params: instituicaoSchema,
    query: z.object({}),
    body: z.object({}),
});

const CriarSchema = z.object({
    body: createInstituicaoSchema,
    params: z.object({}),
    query: z.object({}),
});

const AtualizarSchema = z.object({
    params: instituicaoSchema,
    body: updateInstituicaoSchema,
    query: z.object({}),
});

const DeletarSchema = z.object({
    params: instituicaoSchema,
    query: z.object({}),
    body: z.object({}),
});

// Rotas com validação
router.get("/instituicoes", validate(ListarSchema), controller.getAll);
router.get("/instituicoes/:id", validate(BuscarSchema), controller.getById);
router.post("/instituicoes", validate(CriarSchema), controller.create);
router.put("/instituicoes/:id", validate(AtualizarSchema), controller.update);
router.delete("/instituicoes/:id", validate(DeletarSchema), controller.delete);

export default router;