import { Request, Response, NextFunction } from "express";
import { CursoService } from "../services/curso.service.js";
import { CursoModel } from "../model/curso.js";

export class CursoController {
    private service = new CursoService(new CursoModel());

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cursos = await this.service.getAll();
            res.json(cursos);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const curso = await this.service.getById(Number(id));
            res.json(curso);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const curso = await this.service.create(req.body);
            res.status(201).json(curso);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const curso = await this.service.update(Number(id), req.body);
            res.json(curso);
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
    };
}