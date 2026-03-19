import { z} from 'zod';

export const createInstituicaoSchema = z.object({
    tx_sigla: z.string().max(10, "A sigla deve ter no máximo 10 caracteres"),
    tx_descricao: z.string().max(100, "A descrição deve ter no máximo 100 caracteres"),
});

export const updateInstituicaoSchema = createInstituicaoSchema.partial();

export const instituicaoSchema = z.object({
    id_instituicao: z.number(),
    tx_sigla: z.string().max(10, "A sigla deve ter no máximo 10 caracteres"),
    tx_descricao: z.string().max(100, "A descrição deve ter no máximo 100 caracteres"),
});

export type CreateInstituicaoDTO = z.infer<typeof createInstituicaoSchema>;
export type UpdateInstituicaoDTO = z.infer<typeof updateInstituicaoSchema>;