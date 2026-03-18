export interface Aluno {
  id_aluno: number;
  tx_nome: string;
  tx_sexo: 'm' | 'f';
  dt_nascimento: Date;
}

export interface Professor {
  id_professor: number;
  id_titulo: number;
  tx_nome: string;
  tx_sexo: 'm' | 'f';
  tx_estado_civil: 's' | 'c' | 'd';
  dt_nascimento: Date;
  tx_telefone: string;
}

export interface Disciplina {
  id_disciplina: number;
  id_curso: number | null;
  id_tipo_disciplina: number;
  tx_sigla: string;
  tx_descricao: string;
  in_periodo: number;
  in_carga_horaria: number;
}

export type CreateAlunoDTO = Omit<Aluno, 'id_aluno'>;
export type UpdateAlunoDTO = Partial<CreateAlunoDTO>;

export type CreateProfessorDTO = Omit<Professor, 'id_professor'>;
export type UpdateProfessorDTO = Partial<CreateProfessorDTO>;

export type CreateDisciplinaDTO = Omit<Disciplina, 'id_disciplina'>;
export type UpdateDisciplinaDTO = Partial<CreateDisciplinaDTO>;