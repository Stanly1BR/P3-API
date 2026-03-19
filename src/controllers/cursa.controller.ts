import { Request, Response, NextFunction } from "express";
import { CursaService } from "../services/cursa.service.js";
import { CursaModel } from "../model/cursa.js";

export class CursaController {
  private service = new CursaService(new CursaModel());

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cursas = await this.service.getAll();
      res.json(cursas);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_aluno, id_disciplina } = req.params;
      const cursa = await this.service.getById(Number(id_aluno), Number(id_disciplina));
      res.json(cursa);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cursa = await this.service.create(req.body);
      res.status(201).json(cursa);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_aluno, id_disciplina } = req.params;
      const cursa = await this.service.update(Number(id_aluno), Number(id_disciplina), req.body);
      res.json(cursa);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_aluno, id_disciplina } = req.params;
      const result = await this.service.delete(Number(id_aluno), Number(id_disciplina));
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
