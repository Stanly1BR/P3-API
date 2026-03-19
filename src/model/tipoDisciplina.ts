import { pool } from '../database.js';
import { tipoDisciplina, CreateTipoDisciplinaDTO } from '../types/database.types.js';

export class TipoDisciplinaModel {
    async getAll(): Promise<tipoDisciplina[]> {
        const result = await pool.query('SELECT * FROM tipo_disciplina ORDER BY id_tipo_disciplina');
        return result.rows;
    }

    async getById(id: number): Promise<tipoDisciplina | null> {
        const result = await pool.query('SELECT * FROM tipo_disciplina WHERE id_tipo_disciplina = $1', [id]);
        return result.rows[0] || null;
    }

    async create(data: CreateTipoDisciplinaDTO): Promise<tipoDisciplina> {
        const { tx_descricao } = data;
        const result = await pool.query(
            'INSERT INTO tipo_disciplina (tx_descricao) VALUES ($1) RETURNING *',
            [tx_descricao]
        );
        return result.rows[0];
    }

    async update(id: number, data: Partial<CreateTipoDisciplinaDTO>): Promise<tipoDisciplina | null> {
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
            `UPDATE tipo_disciplina SET ${fields.join(', ')} WHERE id_tipo_disciplina = $${index} RETURNING *`,
            values
        );
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM tipo_disciplina WHERE id_tipo_disciplina = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}


