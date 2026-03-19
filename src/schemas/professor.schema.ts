import { z } from "zod";

export const createProfessorSchema = z.object({
  id_titulo: z.number().positive("ID do título deve ser um número positivo"),
  tx_nome: z
    .string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .max(100, "O nome deve conter no máximo 100 caracteres"),
  tx_sexo: z.enum(["m", "f"], 'O sexo deve ser "m" ou "f"'),
  tx_estado_civil: z.enum(
    ["s", "c", "d"],
    'O estado civil deve ser "s", "c" ou "d"',
  ),
  dt_nascimento: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, "A data de nascimento deve ser uma data válida"),
  tx_telefone: z
    .string()
    .min(10, "O telefone deve conter pelo menos 10 dígitos")
    .max(15, "O telefone deve conter no máximo 15 dígitos"),
});

export const updateProfessorSchema = createProfessorSchema.partial();

export const professorParamsSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .pipe(z.number().positive("ID deve ser um número positivo")),
});

export type CreateProfessorDTO = z.infer<typeof createProfessorSchema>;
export type UpdateProfessorDTO = z.infer<typeof updateProfessorSchema>;
