import { ProfessorModel } from "../model/professor.js";
import { CreateProfessorDTO } from "../types/database.types.js";
import { HttpException } from '../utils/http-exception.js';

export class ProfessorService {
    constructor(private model: ProfessorModel) {}

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id: number) {
        const professor = await this.model.findById(id);

        if (!professor) {
            throw new HttpException(404, 'Professor não encontrado');
        }
        return professor;
    }

    async create(data: CreateProfessorDTO) {
        // Regras de negócio: verificar idade mínima
        const nascimento = new Date(data.dt_nascimento);
        if (isNaN(nascimento.getTime())) {
            throw new HttpException(400, 'Data de nascimento inválida');
        }
        return await this.model.create(data);
    }

    async update(id: number, data: Partial<CreateProfessorDTO>) {
        await this.getById(id);
        return await this.model.update(id, data);
    }

    async delete(id: number){
        await this.getById(id);
        const success = await this.model.delete(id);

        if (!success) {
            throw new HttpException(500, 'Erro ao deletar professor');
        }

        return {message: 'Professor deletado com sucesso'};
    }
}