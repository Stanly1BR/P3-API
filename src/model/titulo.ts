import { pool } from "../database.js";
import { Titulo, CreateTituloDTO } from "../types/database.types.js";


export class TituloModel {
    async findAll(): Promise<Titulo[]> {
        const result = await pool.query("SELECT * FROM titulo ORDER BY id_titulo");
        return result.rows;
    }

    async findById(id: number): Promise<Titulo | null> {
        const result = await pool.query("SELECT * FROM titulo WHERE id_titulo = $1", [id]);
        return result.rows[0] || null;
    }

    async create(data: CreateTituloDTO): Promise<Titulo> {
        const { tx_descricao } = data;
        const result = await pool.query(
            "INSERT INTO titulo (tx_descricao) VALUES ($1) RETURNING *",
            [tx_descricao]
        );
        return result.rows[0];
    }

    async update(id: number, data: Partial<CreateTituloDTO>): Promise<Titulo | null> {
        const fields = [];
        const values = [];
        let index = 1;

        if (data.tx_descricao !== undefined) {
            fields.push(`tx_descricao = $${index++}`);
            values.push(data.tx_descricao);
        }

        if (fields.length === 0) {
            return this.findById(id); // Sem alterações, retorna o registro atual
        }

        values.push(id); // ID para o WHERE

        const result = await pool.query(
            `UPDATE titulo SET ${fields.join(", ")} WHERE id_titulo = $${index} RETURNING *`,
            values
        );
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM titulo WHERE id_titulo = $1", [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }

}