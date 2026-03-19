import { z } from "zod";

export const createAlunoSchema = z.object({
  tx_nome: z
    .string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .max(100, "O nome deve conter no máximo 100 caracteres"),
  tx_sexo: z.enum(["m", "f"], 'O sexo deve ser "m" ou "f"'),
  dt_nascimento: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, "A data de nascimento deve ser uma data válida"),
});

export const updateAlunoSchema = createAlunoSchema.partial();

export const alunoParamsSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .pipe(z.number().positive("ID deve ser um número positivo")),
});

export type CreateAlunoDTO = z.infer<typeof createAlunoSchema>;
export type UpdateAlunoDTO = z.infer<typeof updateAlunoSchema>;
