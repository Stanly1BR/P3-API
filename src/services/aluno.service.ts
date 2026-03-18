import {AlunoModel} from "../model/aluno.js";
import { CreateAlunoDTO } from "../types/database.types.js";
import { HttpException } from '../utils/http-exception.js';

export class AlunoService {
    constructor(private model: AlunoModel) {}

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id: number) {
        const aluno = await this.model.findById(id);

        if (!aluno) {
            throw new HttpException(404, 'Aluno não encontrado');
        }

        return aluno;
    }

    async create(data: CreateAlunoDTO) {
        // Regras de negócio: verificar idade mínima
        const nascimento = new Date(data.dt_nascimento);
        if (isNaN(nascimento.getTime())) {
            throw new HttpException(400, 'Data de nascimento inválida');
        }

        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesDiff = hoje.getMonth() - nascimento.getMonth();
        if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < nascimento.getDate())) {
            idade -= 1;
        }

        if (idade < 14) {
            throw new HttpException(400, 'Aluno deve ter pelo menos 14 anos');
        }

        return await this.model.create(data);
    }

    async update(id: number, data: Partial<CreateAlunoDTO>) {
        await this.getById(id);

        return await this.model.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);

        const success = await this.model.delete(id);

        if (!success) {
            throw new HttpException(500, 'Erro ao deletar aluno');
        }
        return {message: 'Aluno deletado com sucesso'};
    }
}

