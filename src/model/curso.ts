import { pool } from '../database.js'
import { Curso, CreateCursoDTO} from '../types/database.types.js';

export class CursoModel {
    async getAll(): Promise<Curso[]> {
        const result = await pool.query('SELECT * FROM curso');
        return result.rows;
    }

    async getById(id: number): Promise<Curso | null> {
        const result =  await pool.query('SELECT * FROM curso WHERE id_curso = $1', [id]);
        return result.rows[0] || null;
    }

    async create(data: CreateCursoDTO): Promise<Curso> {
        const { id_instituicao, id_tipo_curso, tx_descricao } = data;
        const result = await pool.query('INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES ($1, $2, $3) RETURNING *',
            [id_instituicao, id_tipo_curso, tx_descricao]
        );
        return result.rows[0];
    }

    async update(id: number, data: Partial<CreateCursoDTO>): Promise<Curso | null> {
        const fields = [];
        const values = [];
        let index = 1;

        if (data.id_instituicao !== undefined) {
            fields.push(`id_instituicao = $${index++}`);
            values.push(data.id_instituicao);
        }

        if (data.id_tipo_curso !== undefined) {
            fields.push(`id_tipo_curso = $${index++}`);
            values.push(data.id_tipo_curso);
        }

        if (data.tx_descricao !== undefined) {
            fields.push(`tx_descricao = $${index++}`);
            values.push(data.tx_descricao);
        }

        if (fields.length === 0) {
            return this.getById(id);
        }

        const query = `UPDATE curso SET ${fields.join(', ')} WHERE id_curso = $${index} RETURNING *`;
        values.push(id);

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM curso WHERE id_curso = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}