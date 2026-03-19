import { z } from "zod";

export const createLecionaSchema = z.object({
    id_aluno: z.number().positive("O ID do aluno deve ser um número positivo"),
    id_curso: z.number().positive("O ID do curso deve ser um número positivo"),
});

export const updateLecionaSchema = createLecionaSchema.partial();

export const lecionaParamsSchema = z.object({
    id_professor: z.string().transform(Number).pipe(z.number().positive("O ID do professor deve ser um número positivo")),
    id_disciplina: z.string().transform(Number).pipe(z.number().positive("O ID da disciplina deve ser um número positivo")),
});

export type CreateLecionaDTO = z.infer<typeof createLecionaSchema>;
export type UpdateLecionaDTO = z.infer<typeof updateLecionaSchema>;

