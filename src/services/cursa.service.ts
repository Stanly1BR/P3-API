import { CursaModel } from "../model/cursa.js";
import { CreateCursaDTO } from "../types/database.types.js";
import { HttpException } from "../utils/http-exception.js";

export class CursaService {
  constructor(private model: CursaModel) {}

  async getAll() {
    return await this.model.findAll();
  }

  async getById(id_aluno: number, id_disciplina: number) {
    const cursa = await this.model.findById(id_aluno, id_disciplina);
    if (!cursa) {
      throw new HttpException(404, "Cursa não encontrado");
    }
    return cursa;
  }

  async create(data: CreateCursaDTO) {
    return await this.model.create(data);
  }

  async update(id_aluno: number, id_disciplina: number, data: Partial<CreateCursaDTO>) {
    const cursa = await this.model.update(id_aluno, id_disciplina, data);
    if (!cursa) {
      throw new HttpException(404, "Cursa não encontrado");
    }
    return cursa;
  }

  async delete(id_aluno: number, id_disciplina: number) {
    const deleted = await this.model.delete(id_aluno, id_disciplina);
    if (!deleted) {
      throw new HttpException(404, "Cursa não encontrado");
    }
    return { message: "Cursa deletado com sucesso" };
  }
}
