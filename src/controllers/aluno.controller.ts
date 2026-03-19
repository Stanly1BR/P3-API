import { Request, Response, NextFunction } from "express";
import { AlunoService } from "../services/aluno.service.js";
import { AlunoModel } from "../model/aluno.js";

export class AlunoController {
  private service = new AlunoService(new AlunoModel());

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alunos = await this.service.getAll();
      res.json(alunos);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const aluno = await this.service.getById(Number(id));
      res.json(aluno);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aluno = await this.service.create(req.body);
      res.status(201).json(aluno);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const aluno = await this.service.update(Number(id), req.body);
      res.json(aluno);
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
