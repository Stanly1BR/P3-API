# P3-API

## 1. Visão Geral da API

- Nome do projeto: `P3-API` (package: `p3-api`)
- Propósito: backend RESTful para gestão acadêmica de instituição de ensino (alunos, professores, cursos, disciplinas, vínculos de cursas/leciona, títulos)
- Principais funcionalidades:
  - CRUD completo para entidades: `alunos`, `professores`, `disciplinas`, `cursos`, `instituicao`, `titulo`, `tipoCurso`, `tipoDisciplina`
  - Endpoints relacionais: `leciona` (professor/disciplina), `cursa` (aluno/disciplina)
  - Validação robusta de payload com `zod`
  - Tratamento de erros centralizado com `HttpException`
- Público-alvo:
  - Consumidores: frontend (web/mobile), terceiros, sistemas integrados
  - Mantenedores: desenvolvedores backend

---

## 2. Stack Tecnológica

- Linguagem: TypeScript
- Framework: Express 5
- Banco de dados: PostgreSQL (`pg`)
- Dependências principais:
  - `express`, `cors`, `helmet`, `dotenv`, `pg`, `zod`
- Ferramentas:
  - Validação: `zod` + middleware de validação
  - Tratamento de erros: middleware global + `HttpException`
  - Acesso ao BD: `pg.Pool` com queries paramétricas

---

## 3. Arquitetura do Projeto

- Padrão: MVC minimalista com Service Layer e Repository (Model) apurado
- Estrutura de pastas:
  - `src/routes/*`: definição de rotas e injeção de validação
  - `src/controllers/*`: adaptação HTTP e fluxo de req/res
  - `src/services/*`: regras de negócio e validações de domínio
  - `src/model/*`: queries SQL diretas para PostgreSQL
  - `src/schemas/*`: validação Zod dos payloads (body/params/query)
  - `src/middlewares/*`: validação e error handler
  - `src/database.ts`: pool de conexões PostgreSQL
- Responsabilidades:
  - Rota: endpoint + middleware de validação
  - Controller: receber requisição, chamar service, tratar resposta/erro
  - Service: regras de negócio e exceções (404/400)
  - Model: persistência, query statements

---

## 4. Configuração e Execução

### Pré-requisitos

- Node.js 20+
- PostgreSQL ativo

### Instalação

```bash
npm install
```

### Variáveis de ambiente

- `PORT` (padrão: 3000)
- `NODE_ENV` (ex: development, production)
- `FRONTEND_URL` (origem permitida para CORS, default `http://localhost:5173`)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (configuração PostgreSQL)

### Scripts

- `npm run dev`: `tsx watch --clear-screen=false src/server.ts`
- `npm run build`: `npm run clean && tsc`
- `npm run start`: `node dist/server.js`
- `npm run clean`: `npx rimraf dist`
- `npm run check`: `tsc --noEmit`
- `npm run lint`: `eslint .`
- `npm run format`: `prettier --write .`

---

## 5. Endpoints da API

### Prefixo global

- `/api`

### Recursos CRUD

- `GET /api/alunos`
- `GET /api/alunos/:id`
- `POST /api/alunos`
- `PUT /api/alunos/:id`
- `DELETE /api/alunos/:id`

- Mesma estrutura para: `professores`, `disciplinas`, `cursos`, `instituicao`, `titulo`, `tipoCurso`, `tipoDisciplina`

### Relacionamentos

- `leciona`: `GET /api/leciona`, `GET /api/leciona/:id_professor/:id_disciplina`, `POST`, `PUT`, `DELETE`
- `cursa`: `GET /api/cursa`, `GET /api/cursa/:id_aluno/:id_disciplina`, `POST`, `PUT`, `DELETE`

### Especificações de validação

- Parámetros path id válido (número positivo) via schema `*_paramsSchema`
- Body para criação/atualização via `create*Schema` / `update*Schema`
- `aluno`: `tx_nome` 3-100, `tx_sexo` enum m/f, `dt_nascimento` data válida

### Erros comuns

- 400: validação Zod ou regra de negócio
- 404: registro não encontrado
- 500: erro de servidor

---

## 6. Regras de Negócio

- Aluno deve ter idade >= 14 (verificado em `AlunoService.create`)
- `Service.getById` valida existência para update/delete
- `CursaService`/`LecionaService`: cria e atualiza com chaves compostas (id_aluno+id_disciplina, id_professor+id_disciplina)

---

## 7. Segurança

- Autenticação: não implementada
- Autorização: não implementada
- Proteções:
  - `helmet` (security headers)
  - `cors` com whitelist (variável `FRONTEND_URL`)
  - validação e sanitização via `zod`
  - consultas parametrizadas no `pg` (placeholders `$1`)

---

## 8. Boas Práticas Identificadas

- camada de serviço e controle de erros clara
- validação de entrada no middleware
- uso de DTOs / interfaces de tipo em `types/database.types.ts`
- logs de requisições simples

---

## 9. Pontos de Melhoria

- adicionar auth JWT / RBAC
- cobrir com testes unitários/integrados
- incluir migrations e modelagem migrável (`knex`, `typeorm`, `prisma`)
- gerar documentação OpenAPI/Swagger
- evitar atualização de PK em `cursa/leciona` via serviço
- normalizar datas e timezone da API

---

## 10. Exemplos de Uso

1. `POST /api/instituicao`
2. `POST /api/tipoCurso`
3. `POST /api/curso`
4. `POST /api/tipoDisciplina`
5. `POST /api/disciplinas`
6. `POST /api/professores` + `POST /api/titulo`
7. `POST /api/leciona`
8. `POST /api/alunos` (idade >= 14)
9. `POST /api/cursa`
10. `GET /api/cursa/:id_aluno/:id_disciplina`

---

## 11. Sugestão de Evolução

- testes com Jest + supertest
- containerização com Docker Compose
- pipeline CI/CD GitHub Actions
- versionamento de API (`/v1`)
- monitoramento e métricas (Prometheus/Grafana)
- código modular e injeção de dependência (Inversify/tsyringe)
