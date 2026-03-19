import { pool } from "../database.js";
import { Professor, CreateProfessorDTO } from "../types/database.types.js";

export class ProfessorModel {
  async findAll(): Promise<Professor[]> {
    const result = await pool.query(
      "SELECT * FROM professor ORDER BY id_professor",
    );
    return result.rows;
  }

  async findById(id: number): Promise<Professor | null> {
    const result = await pool.query(
      "SELECT * FROM professor WHERE id_professor = $1",
      [id],
    );
    return result.rows[0] || null;
  }

  async create(data: CreateProfessorDTO): Promise<Professor> {
    const {
      id_titulo,
      tx_nome,
      tx_sexo,
      tx_estado_civil,
      dt_nascimento,
      tx_telefone,
    } = data;

    const result = await pool.query(
      "INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        id_titulo,
        tx_nome,
        tx_sexo,
        tx_estado_civil,
        dt_nascimento,
        tx_telefone,
      ],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    data: Partial<CreateProfessorDTO>,
  ): Promise<Professor | null> {
    const fields = [];
    const values = [];
    let index = 1;

    if (data.id_titulo !== undefined) {
      fields.push(`id_titulo = $${index++}`);
      values.push(data.id_titulo);
    }
    if (data.tx_nome !== undefined) {
      fields.push(`tx_nome = $${index++}`);
      values.push(data.tx_nome);
    }
    if (data.tx_sexo !== undefined) {
      fields.push(`tx_sexo = $${index++}`);
      values.push(data.tx_sexo);
    }
    if (data.tx_estado_civil !== undefined) {
      fields.push(`tx_estado_civil = $${index++}`);
      values.push(data.tx_estado_civil);
    }
    if (data.dt_nascimento !== undefined) {
      fields.push(`dt_nascimento = $${index++}`);
      values.push(data.dt_nascimento);
    }
    if (data.tx_telefone !== undefined) {
      fields.push(`tx_telefone = $${index++}`);
      values.push(data.tx_telefone);
    }

    if (fields.length === 0) {
      return null;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE professor SET ${fields.join(", ")} WHERE id_professor = $${index} RETURNING *`,
      values,
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM professor WHERE id_professor = $1",
      [id],
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}
