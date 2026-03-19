import {z} from 'zod';

export const createTipoDisciplinaSchema = z.object({
    tx_descricao: z.string().min(10, "Descrição é obrigatória").max(100, "Descrição deve ter no máximo 100 caracteres"),
});

export const updateTipoDisciplinaSchema = createTipoDisciplinaSchema.partial();

export const tipoDisciplinaParamsSchema = z.object({
    id: z.string().transform(Number).pipe(z.number().positive("ID deve ser um número positivo")),
});

export type CreateTipoDisciplinaDTO = z.infer<typeof createTipoDisciplinaSchema>;
export type UpdateTipoDisciplinaDTO = z.infer<typeof updateTipoDisciplinaSchema>;