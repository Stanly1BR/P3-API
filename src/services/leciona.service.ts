import { LecionaModel } from "../model/leciona.js";
import { CreateLecionaDTO } from "../types/database.types.js";
import { HttpException } from "../utils/http-exception.js";

export class LecionaService {
  constructor(private model: LecionaModel) {}

  async getAll() {
    return await this.model.findAll();
  }

  async getById(id_professor: number, id_disciplina: number) {
    const leciona = await this.model.findById(id_professor, id_disciplina);
    if (!leciona) {
      throw new HttpException(404, "Leciona não encontrado");
    }
    return leciona;
  }

  async create(data: CreateLecionaDTO) {
    return await this.model.create(data);
  }

  async update(id_professor: number, id_disciplina: number, data: Partial<CreateLecionaDTO>) {
    const leciona = await this.model.update(id_professor, id_disciplina, data);
    if (!leciona) {
      throw new HttpException(404, "Leciona não encontrado");
    }
    return leciona;
  }

  async delete(id_professor: number, id_disciplina: number) {
    const deleted = await this.model.delete(id_professor, id_disciplina);
    if (!deleted) {
      throw new HttpException(404, "Leciona não encontrado");
    }
    return { message: "Leciona deletado com sucesso" };
  }
}
