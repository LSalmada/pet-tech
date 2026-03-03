## Projeto Pettech

Aplicação backend desenvolvida como parte da **Pós-graduação em Desenvolvimento Fullstack da Pós**.
O objetivo é praticar conceitos de APIs REST, acesso a banco de dados Postgres, validação de dados e organização de código em camadas.

### Funcionalidades principais

- **Cadastro de pessoas**: gerenciamento de dados pessoais e endereços.
- **Cadastro de usuários**: tabela de usuários com vínculo às pessoas.
- **Catálogo de produtos e categorias**: entidades de produto, categoria e relacionamento entre elas.
- **API HTTP com Fastify**: rotas organizadas em `controllers` e `repositories`.

### Tecnologias utilizadas

- **Node.js + TypeScript**
- **Fastify** (servidor HTTP)
- **PostgreSQL** (banco de dados relacional)
- **pg** (driver de conexão)
- **Zod** (validação de dados)
- **ESLint + Prettier** (qualidade de código)

---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado (versão LTS recomendada)
- Docker e Docker Compose (ou apenas Docker, se preferir rodar o Postgres direto)

### 1. Subir o banco Postgres com Docker

No diretório do projeto, execute:

```bash
docker rm -f pettech-postgres 2>/dev/null || true

docker run -d \
  --name pettech-postgres \
  -e POSTGRES_DB=pettech_development \
  -e POSTGRES_USER=pettech_user \
  -e POSTGRES_PASSWORD=pettech_password \
  -p 5432:5432 \
  -v pettech_pgdata:/var/lib/postgresql/data \
  postgres:16
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (se ainda não existir) com as credenciais do banco.  
Exemplo:

```env
DATABASE_URL=postgres://pettech_user:pettech_password@localhost:5432/pettech_development
```

### 4. Rodar em modo desenvolvimento

```bash
npm run start:dev
```

O servidor será iniciado usando `src/server.ts`.

### 5. Build e modo produção

```bash
npm run build
npm start
```

---

## Script de criação das tabelas no Postgres

Execute o script abaixo no banco `pettech_development` (via `psql`, DBeaver, Beekeeper, etc.):

```sql
CREATE TABLE product (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  price DOUBLE PRECISION
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  creation_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE product_category (
  product_id UUID NOT NULL,
  category_id SERIAL NOT NULL,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip_code VARCHAR(10) NOT NULL
);

CREATE TABLE person (
  id BIGSERIAL PRIMARY KEY,
  cpf VARCHAR(11) NOT NULL,
  name VARCHAR(100) NOT NULL,
  birth DATE NOT NULL,
  email VARCHAR(255) NOT NULL
);

ALTER TABLE address
ADD COLUMN person_id BIGINT NOT NULL;

ALTER TABLE address
ADD CONSTRAINT fk_address_person
FOREIGN KEY (person_id)
REFERENCES person(id);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

ALTER TABLE person
ADD COLUMN user_id INT UNIQUE,
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user"(id);
```

---

## Estrutura básica do código

Alguns diretórios importantes:

- **`src/app.ts`**: configuração principal da aplicação Fastify.
- **`src/server.ts`**: ponto de entrada do servidor HTTP.
- **`src/http/controllers`**: controladores HTTP (rotas de `user`, `person`, etc.).
- **`src/repositories`**: acesso ao banco de dados.
- **`src/lib/pg/db.ts`**: configuração da conexão com o Postgres.

---

## Próximos passos / ideias de evolução

- **Autenticação e autorização** (JWT, sessões, etc.).
- **Validações mais ricas** nas APIs usando Zod.
- **Testes automatizados** (unitários e de integração).
- **Documentação da API** (OpenAPI/Swagger).