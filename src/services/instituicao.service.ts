import {InstituicaoModel} from '../model/instituicao.js';
import {Instituicao} from '../types/database.types.js';
import {HttpException} from '../utils/http-exception.js';

export class InstituicaoService {
  constructor(private model: InstituicaoModel) {}

    async getAll() {
    return await this.model.getAll();
  }

    async getById(id: number) {
    const instituicao = await this.model.getById(id);

    if (!instituicao) {
      throw new HttpException(404, "Instituição não encontrada");
    }
    return instituicao;
  }

    async create(data: Omit<Instituicao, "id_instituicao">) {
    return await this.model.create(data);
  }

    async update(id: number, data: Partial<Omit<Instituicao, "id_instituicao">>) {
    await this.getById(id);
    return await this.model.update(id, data);
  }

    async delete(id: number) {
    await this.getById(id);
    return await this.model.delete(id);
  }
}