import { Disciplina } from "../types/database.types.js";
import { DisciplinaModel } from "../model/disciplina.js";
import { HttpException } from "../utils/http-exception.js";

export class DisciplinaService {
  constructor(private model: DisciplinaModel) {}

  async getAll() {
    return await this.model.findAll();
  }

  async getById(id: number) {
    const disciplina = await this.model.findById(id);

    if (!disciplina) {
      throw new HttpException(404, "Disciplina não encontrada");
    }
    return disciplina;
  }

  async create(data: Omit<Disciplina, "id">) {
    return await this.model.create(data);
  }

  async update(id: number, data: Partial<Omit<Disciplina, "id">>) {
    await this.getById(id);

    return await this.model.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);
    return await this.model.delete(id);
  }
}
