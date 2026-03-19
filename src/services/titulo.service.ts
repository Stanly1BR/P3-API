import { TituloModel } from "../model/titulo.js";
import { CreateTituloDTO } from "../types/database.types.js";
import { HttpException } from "../utils/http-exception.js";

export class TituloService {
    constructor(private model: TituloModel) {}

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id: number) {
        const titulo = await this.model.findById(id);
        if (!titulo) {
            throw new HttpException(404, "Título não encontrado");
        }
        return titulo;
    }

    async create(data: CreateTituloDTO) {
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<CreateTituloDTO>) {
        await this.getById(id);
        return await this.model.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        const success = await this.model.delete(id);
        if (!success) {
            throw new HttpException(500, "Erro ao deletar título");
        }
        return { message: "Título deletado com sucesso" };
    }
}