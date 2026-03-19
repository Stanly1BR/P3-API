import { Response, Request, NextFunction } from "express";
import { ProfessorService } from "../services/professor.service.js";
import { ProfessorModel } from "../model/professor.js";

export class ProfessorController {
  private service = new ProfessorService(new ProfessorModel());

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const professores = await this.service.getAll();
      res.json(professores);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const professor = await this.service.getById(Number(id));
      res.json(professor);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const professor = await this.service.create(req.body);
      res.status(201).json(professor);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const professor = await this.service.update(Number(id), req.body);
      res.json(professor);
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
