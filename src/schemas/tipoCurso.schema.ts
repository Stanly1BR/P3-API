import {z} from "zod";

export const createTipoCursoSchema = z.object({
    tx_descricao: z.string()
        .min(3, "A descrição deve conter pelo menos 3 caracteres")
        .max(100, "A descrição deve conter no máximo 100 caracteres"),
});

export const updateTipoCursoSchema = createTipoCursoSchema.partial();

export const tipoCursoParamsSchema = z.object({
    id: z.string()
        .transform(Number)
        .pipe(z.number().positive("ID deve ser um número positivo")),
});