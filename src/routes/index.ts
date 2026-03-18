import { Router } from 'express';
import alunoRoutes from './aluno.routes.js';
import ProfessorRoutes from './professor.routes.js';
import disciplinaRoutes from './disciplina.routes.js';

const router = Router();

router.use('/api', alunoRoutes);
router.use('/api', ProfessorRoutes);
router.use('/api', disciplinaRoutes);

export { router };