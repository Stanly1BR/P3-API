import { TipoCursoModel } from "../model/tipoCurso.js";
import { CreateTipoCursoDTO } from "../types/database.types.js";
import { HttpException } from "../utils/http-exception.js";

export class TipoCursoService {
    constructor(private model: TipoCursoModel) {}

    async getAll() {
        return await this.model.getAll();
    }

    async getById(id: number) {
        const tipoCurso = await this.model.getById(id);
        if (!tipoCurso) {
            throw new HttpException(404, "Tipo de curso não encontrado");
        }
        return tipoCurso;
    }

    async create(data: CreateTipoCursoDTO) {
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<CreateTipoCursoDTO>) {
        await this.getById(id);
        return await this.model.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        const success = await this.model.delete(id);
        if (!success) {
            throw new HttpException(500, "Erro ao deletar tipo de curso");
        }
        return { message: "Tipo de curso deletado com sucesso" };
    }
}