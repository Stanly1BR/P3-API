import { pool } from "../database.js";
import { tipoCurso, CreateTipoCursoDTO } from "../types/database.types.js";

export class TipoCursoModel {

    async getAll(): Promise<tipoCurso[]> {
        const result = await pool.query("SELECT * FROM tipo_curso ORDER BY id_tipo_curso");
        return result.rows;
    }

    async getById(id: number): Promise<tipoCurso | null> {
        const result = await pool.query("SELECT * FROM tipo_curso WHERE id_tipo_curso = $1", [id]);
        return result.rows[0] || null;
    }

    async create(data: CreateTipoCursoDTO): Promise<tipoCurso> {
        const { tx_descricao } = data;
        const result = await pool.query(
            "INSERT INTO tipo_curso (tx_descricao) VALUES ($1) RETURNING *",
            [tx_descricao]
        );
        return result.rows[0];
    }

    async update(id: number, data: Partial<CreateTipoCursoDTO>): Promise<tipoCurso | null> {
        const fields = [];
        const values = [];
        let index = 1;
        if (data.tx_descricao !== undefined) {
            fields.push(`tx_descricao = $${index++}`);
            values.push(data.tx_descricao);
        }
        if (fields.length === 0) {
            return null;
        }
        values.push(id);
        const result = await pool.query(
            `UPDATE tipo_curso SET ${fields.join(", ")} WHERE id_tipo_curso = $${index} RETURNING *`,
            values );
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM tipo_curso WHERE id_tipo_curso = $1", [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}