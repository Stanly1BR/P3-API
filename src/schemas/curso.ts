import {z} from 'zod';

export const createCursoSchema = z.object({
    id_instituicao: z.number().positive("O ID da instituição deve ser um número positivo"),
    id_tipo_curso: z.number().positive("O ID do tipo de curso deve ser um número positivo"),
    tx_descricao: z.string().min(1, "A descrição do curso é obrigatória").max(100, "A descrição do curso deve ter no máximo 100 caracteres.")
});

export const updateCursoSchema = createCursoSchema.partial();

export const cursoParamsSchema = z.object({
    id: z.string().transform(Number).pipe(z.number().positive("ID deve ser um número positivo"))
});

export type CreateCursoDTO = z.infer<typeof createCursoSchema>;
export type UpdateCursoDTO = z.infer<typeof updateCursoSchema>;
