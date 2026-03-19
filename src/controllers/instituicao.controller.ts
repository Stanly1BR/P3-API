import { Request, Response, NextFunction } from "express";
import { InstituicaoService } from "../services/instituicao.service.js";
import { InstituicaoModel } from "../model/instituicao.js";

export class InstituicaoController {
  private service = new InstituicaoService(new InstituicaoModel());

    getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instituicoes = await this.service.getAll();
      res.json(instituicoes);
    } catch (error) {
      next(error);
    }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
        const instituicao = await this.service.getById(Number(id));
        res.json(instituicao);
    } catch (error) {
      next(error);
    }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instituicao = await this.service.create(req.body);
      res.status(201).json(instituicao);
    } catch (error) {
      next(error);
    }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
        const instituicao = await this.service.update(Number(id), req.body);
        res.json(instituicao);
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