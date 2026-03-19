import { z } from "zod";

export const createDisciplinaSchema = z.object({
  id_curso: z.number().nullable(),
  id_tipo_disciplina: z.number(),
  tx_sigla: z.string(),
  tx_descricao: z.string(),
  in_periodo: z.number(),
  in_carga_horaria: z.number(),
});

export const updateDisciplinaSchema = createDisciplinaSchema.partial();

export const disciplinaParamsSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .pipe(z.number().positive("ID deve ser um número positivo")),
});

export type CreateDisciplinaDTO = z.infer<typeof createDisciplinaSchema>;
export type UpdateDisciplinaDTO = z.infer<typeof updateDisciplinaSchema>;
