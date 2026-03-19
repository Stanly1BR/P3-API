import { TipoDisciplinaModel } from "../model/tipoDisciplina.js";
import { CreateTipoDisciplinaDTO } from "../types/database.types.js";
import { HttpException } from "../utils/http-exception.js";

export class TipoDisciplinaService {
    constructor(private model: TipoDisciplinaModel) {}

    async getAll() {
        return await this.model.getAll();
    }

    async getById(id: number) {
        const tipoDisciplina = await this.model.getById(id);
        if (!tipoDisciplina) {
            throw new HttpException(404, "Tipo de disciplina não encontrado");
        }
        return tipoDisciplina;
    }

    async create(data: CreateTipoDisciplinaDTO) {
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<CreateTipoDisciplinaDTO>) {
        await this.getById(id);
        return await this.model.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        const success = await this.model.delete(id);
        if (!success) {
            throw new HttpException(500, "Erro ao deletar tipo de disciplina");
        }
        return { message: "Tipo de disciplina deletado com sucesso" };
    }
}
