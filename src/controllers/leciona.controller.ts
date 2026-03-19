import { Request, Response, NextFunction } from "express";
import { LecionaService } from "../services/leciona.service.js";
import { LecionaModel } from "../model/leciona.js";

export class LecionaController {
  private service = new LecionaService(new LecionaModel());

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lecionas = await this.service.getAll();
      res.json(lecionas);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_professor, id_disciplina } = req.params;
      const leciona = await this.service.getById(Number(id_professor), Number(id_disciplina));
      res.json(leciona);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leciona = await this.service.create(req.body);
      res.status(201).json(leciona);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_professor, id_disciplina } = req.params;
      const leciona = await this.service.update(Number(id_professor), Number(id_disciplina), req.body);
      res.json(leciona);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_professor, id_disciplina } = req.params;
      const result = await this.service.delete(Number(id_professor), Number(id_disciplina));
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
