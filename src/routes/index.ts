import { Router } from "express";
import alunoRoutes from "./aluno.routes.js";
import ProfessorRoutes from "./professor.routes.js";
import disciplinaRoutes from "./disciplina.routes.js";
import titulo from "./titulo.routes.js";
import tipoCursoRoutes from "./tipoCurso.routes.js";
import tipoDisciplinaRoutes from "./tipoDisciplina.routes.js";
import instituicaoRoutes from "./instituicao.routes.js";

const router = Router();

router.use("/api", alunoRoutes);
router.use("/api", ProfessorRoutes);
router.use("/api", disciplinaRoutes);

router.use("/api", titulo);
router.use("/api", tipoCursoRoutes);
router.use("/api", tipoDisciplinaRoutes);
router.use("/api", instituicaoRoutes);


export { router };
