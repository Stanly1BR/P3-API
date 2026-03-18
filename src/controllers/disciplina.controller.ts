import { Request, Response, NextFunction } from "express";
import { DisciplinaService } from "../services/disciplina.service.js";
import { DisciplinaModel } from "../model/disciplina.js";

export class DisciplinaController {
    private service = new DisciplinaService(new DisciplinaModel());

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const disciplinas = await this.service.getAll();
            res.json(disciplinas);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const disciplina = await this.service.getById(Number(id));
            res.json(disciplina);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const disciplina = await this.service.create(req.body);
            res.status(201).json(disciplina);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params; 
            const disciplina = await this.service.update(Number(id), req.body);
            res.json(disciplina);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.service.delete(Number(id));
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}