import { Request, Response, NextFunction } from "express";
import { TituloModel } from "../model/titulo.js";
import { TituloService } from "../services/titulo.service.js";

export class TituloController {
    private service = new TituloService(new TituloModel());

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const titulos = await this.service.getAll();
            res.json(titulos);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const titulo = await this.service.getById(Number(id));
            res.json(titulo);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const titulo = await this.service.create(req.body);
            res.status(201).json(titulo);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const titulo = await this.service.update(Number(id), req.body);
            res.json(titulo);
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