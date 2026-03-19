import { Request, Response, NextFunction } from "express";
import { TipoDisciplinaModel } from "../model/tipoDisciplina.js";
import { TipoDisciplinaService } from "../services/tipoDisciplina.service.js";

export class TipoDisciplinaController {
    private service = new TipoDisciplinaService(new TipoDisciplinaModel());

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tiposDisciplina = await this.service.getAll();
            res.json(tiposDisciplina);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const tipoDisciplina = await this.service.getById(Number(id));
            res.json(tipoDisciplina);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tipoDisciplina = await this.service.create(req.body);
            res.status(201).json(tipoDisciplina);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const tipoDisciplina = await this.service.update(Number(id), req.body);
            res.json(tipoDisciplina);
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