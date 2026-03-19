import { pool } from "../database.js";
import { Cursa, CreateCursaDTO } from "../types/database.types.js";

export class CursaModel {
  async findAll(): Promise<Cursa[]> {
    const result = await pool.query("SELECT * FROM cursa ORDER BY id_aluno, id_disciplina");
    return result.rows;
  }

  async findById(id_aluno: number, id_disciplina: number): Promise<Cursa | null> {
    const result = await pool.query(
      "SELECT * FROM cursa WHERE id_aluno = $1 AND id_disciplina = $2",
      [id_aluno, id_disciplina],
    );
    return result.rows[0] || null;
  }

  async create(data: CreateCursaDTO): Promise<Cursa> {
    const {
      id_aluno,
      id_disciplina,
      in_ano,
      in_semestre,
      in_faltas,
      nm_nota1,
      nm_nota2,
      nm_nota3,
    } = data;

    const result = await pool.query(
      "INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        id_aluno,
        id_disciplina,
        in_ano,
        in_semestre,
        in_faltas,
        nm_nota1,
        nm_nota2,
        nm_nota3,
      ],
    );

    return result.rows[0];
  }

  async update(
    id_aluno: number,
    id_disciplina: number,
    data: Partial<CreateCursaDTO>,
  ): Promise<Cursa | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (data.in_ano !== undefined) {
      fields.push(`in_ano = $${index++}`);
      values.push(data.in_ano);
    }

    if (data.in_semestre !== undefined) {
      fields.push(`in_semestre = $${index++}`);
      values.push(data.in_semestre);
    }

    if (data.in_faltas !== undefined) {
      fields.push(`in_faltas = $${index++}`);
      values.push(data.in_faltas);
    }

    if (data.nm_nota1 !== undefined) {
      fields.push(`nm_nota1 = $${index++}`);
      values.push(data.nm_nota1);
    }

    if (data.nm_nota2 !== undefined) {
      fields.push(`nm_nota2 = $${index++}`);
      values.push(data.nm_nota2);
    }

    if (data.nm_nota3 !== undefined) {
      fields.push(`nm_nota3 = $${index++}`);
      values.push(data.nm_nota3);
    }

    if (data.id_aluno !== undefined) {
      fields.push(`id_aluno = $${index++}`);
      values.push(data.id_aluno);
    }

    if (data.id_disciplina !== undefined) {
      fields.push(`id_disciplina = $${index++}`);
      values.push(data.id_disciplina);
    }

    if (fields.length === 0) {
      return this.findById(id_aluno, id_disciplina);
    }

    values.push(id_aluno, id_disciplina);

    const result = await pool.query(
      `UPDATE cursa SET ${fields.join(", ")} WHERE id_aluno = $${index++} AND id_disciplina = $${index} RETURNING *`,
      values,
    );

    return result.rows[0] || null;
  }

  async delete(id_aluno: number, id_disciplina: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM cursa WHERE id_aluno = $1 AND id_disciplina = $2",
      [id_aluno, id_disciplina],
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}
