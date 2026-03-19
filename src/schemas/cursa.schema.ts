import { z } from "zod";

export const createCursaSchema = z.object({
  id_aluno: z.number().positive("O ID do aluno deve ser um número positivo"),
  id_disciplina: z.number().positive("O ID da disciplina deve ser um número positivo"),
  in_ano: z.number().int().min(1900, "Ano inválido").max(9999, "Ano inválido"),
  in_semestre: z.number().int().min(1, "Semestre inválido").max(2, "Semestre inválido"),
  in_faltas: z.number().int().min(0, "Faltas inválidas"),
  nm_nota1: z.number().min(0, "Nota inválida").max(10, "Nota inválida").nullable(),
  nm_nota2: z.number().min(0, "Nota inválida").max(10, "Nota inválida").nullable(),
  nm_nota3: z.number().min(0, "Nota inválida").max(10, "Nota inválida").nullable(),
});

export const updateCursaSchema = createCursaSchema.partial();

export const cursaParamsSchema = z.object({
  id_aluno: z.string().transform(Number).pipe(z.number().positive("O ID do aluno deve ser um número positivo")),
  id_disciplina: z.string().transform(Number).pipe(z.number().positive("O ID da disciplina deve ser um número positivo")),
});

export type CreateCursaDTO = z.infer<typeof createCursaSchema>;
export type UpdateCursaDTO = z.infer<typeof updateCursaSchema>;