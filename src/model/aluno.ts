import { pool } from "../database.js";
import { Aluno, CreateAlunoDTO } from "../types/database.types.js";

export class AlunoModel {
  async findAll(): Promise<Aluno[]> {
    const result = await pool.query("SELECT * FROM aluno ORDER BY id_aluno");
    return result.rows;
  }

  async findById(id: number): Promise<Aluno | null> {
    const result = await pool.query("SELECT * FROM aluno WHERE id_aluno = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async create(data: CreateAlunoDTO): Promise<Aluno> {
    const { tx_nome, tx_sexo, dt_nascimento } = data;

    const result = await pool.query(
      "INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES ($1, $2, $3) RETURNING *",
      [tx_nome, tx_sexo, dt_nascimento],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    data: Partial<CreateAlunoDTO>,
  ): Promise<Aluno | null> {
    const fields = [];
    const values = [];
    let index = 1;

    if (data.tx_nome !== undefined) {
      fields.push(`tx_nome = $${index++}`);
      values.push(data.tx_nome);
    }

    if (data.tx_sexo !== undefined) {
      fields.push(`tx_sexo = $${index++}`);
      values.push(data.tx_sexo);
    }

    if (data.dt_nascimento !== undefined) {
      fields.push(`dt_nascimento = $${index++}`);
      values.push(data.dt_nascimento);
    }

    if (fields.length === 0) {
      return null;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE aluno SET ${fields.join(", ")} WHERE id_aluno = $${index} RETURNING *`,
      values,
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM aluno WHERE id_aluno = $1", [
      id,
    ]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
