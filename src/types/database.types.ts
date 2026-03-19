export interface Aluno {
  id_aluno: number;
  tx_nome: string;
  tx_sexo: "m" | "f";
  dt_nascimento: Date;
}

export type CreateAlunoDTO = Omit<Aluno, "id_aluno">;
export type UpdateAlunoDTO = Partial<CreateAlunoDTO>;

export interface Professor {
  id_professor: number;
  id_titulo: number;
  tx_nome: string;
  tx_sexo: "m" | "f";
  tx_estado_civil: "s" | "c" | "d";
  dt_nascimento: Date;
  tx_telefone: string;
}

export type CreateProfessorDTO = Omit<Professor, "id_professor">;
export type UpdateProfessorDTO = Partial<CreateProfessorDTO>;

export interface Disciplina {
  id_disciplina: number;
  id_curso: number | null;
  id_tipo_disciplina: number;
  tx_sigla: string;
  tx_descricao: string;
  in_periodo: number;
  in_carga_horaria: number;
}

export type CreateDisciplinaDTO = Omit<Disciplina, "id_disciplina">;
export type UpdateDisciplinaDTO = Partial<CreateDisciplinaDTO>;


export interface Titulo {
  id_titulo: number;
  tx_descricao: string;
}

export type CreateTituloDTO = Omit<Titulo, "id_titulo">;
export type UpdateTituloDTO = Partial<CreateTituloDTO>;

export interface tipoCurso {
  id_tipo_curso: number;
  tx_descricao: string;
}

export type CreateTipoCursoDTO = Omit<tipoCurso, "id_tipo_curso">;
export type UpdateTipoCursoDTO = Partial<CreateTipoCursoDTO>;

export interface tipoDisciplina {
  id_tipo_disciplina: number;
  tx_descricao: string;
}

export type CreateTipoDisciplinaDTO = Omit<tipoDisciplina, "id_tipo_disciplina">;
export type UpdateTipoDisciplinaDTO = Partial<CreateTipoDisciplinaDTO>;

export interface Instituicao {
  id_instituicao: number;
  tx_sigla: string;
  tx_descricao: string;
}

export type CreateInstituicaoDTO = Omit<Instituicao, "id_instituicao">;
export type UpdateInstituicaoDTO = Partial<CreateInstituicaoDTO>;

export interface Curso {
  id_curso: number;
  id_instituicao: number;
  id_tipo_curso: number;
  tx_descricao: string;
}

export type CreateCursoDTO = Omit<Curso, "id_curso">;
export type UpdateCursoDTO = Partial<CreateCursoDTO>;

export interface Leciona {
  id_professor: number;
  id_disciplina: number;
}

export type CreateLecionaDTO = Leciona; // Precisa dos dois IDs
export type UpdateLecionaDTO = Partial<CreateLecionaDTO>;

export interface Cursa {
  id_aluno: number;
  id_disciplina: number;
  in_ano: number;
  in_semestre: number;
  in_faltas: number;
  nm_nota1: number | null;
  nm_nota2: number | null;
  nm_nota3: number | null;
  bl_aprovado: boolean;
}

// Para criar, precisa de tudo MENOS bl_aprovado (tem default)
export type CreateCursaDTO = Omit<Cursa, "bl_aprovado">;
// Para atualizar, pode ser qualquer campo, mas precisa dos IDs
export type UpdateCursaDTO = Partial<Omit<Cursa, "id_aluno" | "id_disciplina">> & Pick<Cursa, "id_aluno" | "id_disciplina">;