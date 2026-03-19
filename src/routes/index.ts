import { Router } from "express";
import alunoRoutes from "./aluno.routes.js";
import ProfessorRoutes from "./professor.routes.js";
import disciplinaRoutes from "./disciplina.routes.js";
import titulo from "./titulo.routes.js";
import tipoCursoRoutes from "./tipoCurso.routes.js";
import tipoDisciplinaRoutes from "./tipoDisciplina.routes.js";
import instituicaoRoutes from "./instituicao.routes.js";
import cursoRoutes from "./curso.routes.js";
import lecionaRoutes from "./leciona.routes.js";
import cursaRoutes from "./cursa.routes.js";

const router = Router();

router.use("/api", alunoRoutes);
router.use("/api", ProfessorRoutes);
router.use("/api", disciplinaRoutes);

router.use("/api", titulo);
router.use("/api", tipoCursoRoutes);
router.use("/api", tipoDisciplinaRoutes);
router.use("/api", instituicaoRoutes);

router.use("/api", cursoRoutes);

router.use("/api", lecionaRoutes);
router.use("/api", cursaRoutes);

export { router };
