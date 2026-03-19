import {z} from "zod";

export const createTituloSchema = z.object({
    id_titulo: z.number().positive("ID do título deve ser um número positivo"),
    tx_descricao: z.string().min(3, "A descrição deve conter pelo menos 3 caracteres").max(100, "A descrição deve conter no máximo 100 caracteres"),
});

export const updateTituloSchema = createTituloSchema.partial();

export const tituloParamsSchema = z.object({
    id: z.string().transform(Number).pipe(z.number().positive("ID deve ser um número positivo")),
});

export type CreateTituloDTO = z.infer<typeof createTituloSchema>;
export type UpdateTituloDTO = z.infer<typeof updateTituloSchema>;