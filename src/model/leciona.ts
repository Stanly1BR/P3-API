import { pool } from "../database.js";
import { Leciona, CreateLecionaDTO } from "../types/database.types.js";

export class LecionaModel {
  async findAll(): Promise<Leciona[]> {
    const result = await pool.query("SELECT * FROM leciona ORDER BY id_professor, id_disciplina");
    return result.rows;
  }

  async findById(id_professor: number, id_disciplina: number): Promise<Leciona | null> {
    const result = await pool.query(
      "SELECT * FROM leciona WHERE id_professor = $1 AND id_disciplina = $2",
      [id_professor, id_disciplina],
    );
    return result.rows[0] || null;
  }

  async create(data: CreateLecionaDTO): Promise<Leciona> {
    const { id_professor, id_disciplina } = data;
    const result = await pool.query(
      "INSERT INTO leciona (id_professor, id_disciplina) VALUES ($1, $2) RETURNING *",
      [id_professor, id_disciplina],
    );
    return result.rows[0];
  }

  async update(
    id_professor: number,
    id_disciplina: number,
    data: Partial<CreateLecionaDTO>,
  ): Promise<Leciona | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (data.id_professor !== undefined) {
      fields.push(`id_professor = $${index++}`);
      values.push(data.id_professor);
    }

    if (data.id_disciplina !== undefined) {
      fields.push(`id_disciplina = $${index++}`);
      values.push(data.id_disciplina);
    }

    if (fields.length === 0) {
      return this.findById(id_professor, id_disciplina);
    }

    values.push(id_professor, id_disciplina);

    const result = await pool.query(
      `UPDATE leciona SET ${fields.join(", ")} WHERE id_professor = $${index++} AND id_disciplina = $${index} RETURNING *`,
      values,
    );

    return result.rows[0] || null;
  }

  async delete(id_professor: number, id_disciplina: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM leciona WHERE id_professor = $1 AND id_disciplina = $2",
      [id_professor, id_disciplina],
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}
