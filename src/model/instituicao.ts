import {pool} from '../database.js';
import {Instituicao} from '../types/database.types.js';

export class InstituicaoModel {
  async getAll(): Promise<Instituicao[]> {
    const result = await pool.query('SELECT * FROM instituicao');
    return result.rows as Instituicao[];
  }

  async getById(id: number): Promise<Instituicao | null> {
    const result = await pool.query('SELECT * FROM instituicao WHERE id_instituicao = $1', [id]);
    return result.rows[0] as Instituicao || null;
  }

  async create(instituicao: Omit<Instituicao, 'id_instituicao'>): Promise<Instituicao> {
    const result = await pool.query(
      'INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES ($1, $2) RETURNING *',
      [instituicao.tx_sigla, instituicao.tx_descricao]
    );
    return result.rows[0] as Instituicao;
  }

  async update(id: number, instituicao: Partial<Omit<Instituicao, 'id_instituicao'>>): Promise<Instituicao | null> {
    const existing = await this.getById(id);
    if (!existing) {
      return null;
    }
    const updated = {
      ...existing,
      ...instituicao    };
    const result = await pool.query(
      'UPDATE instituicao SET tx_sigla = $1, tx_descricao = $2 WHERE id_instituicao = $3 RETURNING *',
      [updated.tx_sigla, updated.tx_descricao, id]
    );
    return result.rows[0] as Instituicao;
  }

    async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM instituicao WHERE id_instituicao = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}