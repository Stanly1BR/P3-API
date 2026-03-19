import {CursoModel} from '../model/curso.js';
import {CreateCursoDTO} from '../types/database.types.js';
import { HttpException } from "../utils/http-exception.js";

export class CursoService {
    constructor(private model: CursoModel) {}

    async getAll() {
        return await this.model.getAll();
    }

    async getById(id: number) {
        const curso = await this.model.getById(id);
        if (!curso) {
            throw new HttpException(404, "Curso não encontrado");
        }
        return curso;
    }

    async create(data: CreateCursoDTO) {
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<CreateCursoDTO>) {
        const curso = await this.model.update(id, data);
        if (!curso) {
            throw new HttpException(404, "Curso não encontrado");
        }
        return curso;
    }

    async delete(id: number) {
        const deleted = await this.model.delete(id);
        if (!deleted) {
            throw new HttpException(404, "Curso não encontrado");
        }
        return deleted;
    }
}