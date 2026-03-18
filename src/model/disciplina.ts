import {pool} from '../database.js';
import {Disciplina, CreateDisciplinaDTO} from '../types/database.types.js';

export class DisciplinaModel {
    async findAll(): Promise<Disciplina[]> {
        const result = await pool.query('SELECT * FROM disciplina ORDER BY id_disciplina');
        return result.rows;
    }
    
    async findById(id: number): Promise<Disciplina | null> {
        const result = await pool.query('SELECT * FROM disciplina WHERE id_disciplina = $1', [id]);
        return result.rows[0] || null;
    }

    async create(data: CreateDisciplinaDTO): Promise<Disciplina> {
        const { id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria } = data;

        const result = await pool.query(
            'INSERT INTO disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria]);
        return result.rows[0];
    }

    async update(id: number, data: Partial<CreateDisciplinaDTO>): Promise<Disciplina | null> {
        const fields = [];
        const values = [];
        let index = 1;

        if (data.id_curso !== undefined) {
            fields.push('id_curso = $');
            values.push(data.id_curso);
        }

        if (data.id_tipo_disciplina !== undefined) {
            fields.push('id_tipo_disciplina = $');
            values.push(data.id_tipo_disciplina);
        }

        if (data.tx_sigla !== undefined) {
            fields.push('tx_sigla = $');
            values.push(data.tx_sigla);
        }

        if (data.tx_descricao !== undefined) {
            fields.push('tx_descricao = $');
            values.push(data.tx_descricao);
        }

        if (data.in_periodo !== undefined) {
            fields.push('in_periodo = $');
            values.push(data.in_periodo);
        }

        if (data.in_carga_horaria !== undefined) {
            fields.push('in_carga_horaria = $');
            values.push(data.in_carga_horaria);
        }

        if (fields.length === 0) {
            return null;
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE disciplina SET ${fields.join(', ')} WHERE id_disciplina = $${
                values.length
            } RETURNING *`,
            values
        );

        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM disciplina WHERE id_disciplina = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}