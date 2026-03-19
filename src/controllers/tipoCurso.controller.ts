import { Request, Response, NextFunction } from "express";
import { TipoCursoModel } from "../model/tipoCurso.js";
import { TipoCursoService } from "../services/tipoCurso.service.js";

export class TipoCursoController {
    private service = new TipoCursoService(new TipoCursoModel());

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tiposCurso = await this.service.getAll();
            res.json(tiposCurso);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const tipoCurso = await this.service.getById(Number(id));
            res.json(tipoCurso);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const newTipoCurso = await this.service.create(data);
            res.status(201).json(newTipoCurso);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedTipoCurso = await this.service.update(Number(id), data);
            res.json(updatedTipoCurso);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params;
            const result = await this.service.delete(Number(id));
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}