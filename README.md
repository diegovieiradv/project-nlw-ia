# NLW IA - Backend API

Backend API para o projeto NLW IA, construído com **Fastify**, **Drizzle ORM** e **PostgreSQL** com suporte a **pgvector** para embeddings vetoriais.

## Stack

- **Runtime:** Node.js com TypeScript nativo (`--experimental-strip-types`)
- **Framework:** Fastify v5
- **Banco de Dados:** PostgreSQL 17 + pgvector
- **ORM:** Drizzle ORM
- **Validação:** Zod + fastify-type-provider-zod
- **Lint/Format:** Biome + Ultracite

## Pré-requisitos

- Node.js >= 22
- Docker

## Configuração

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Subir banco de dados
docker compose up -d

# Gerar migrations
npm run db:generate

# Aplicar migrations
npm run db:push
```

## Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com hot-reload |
| `npm run start` | Inicia o servidor em modo de produção |
| `npm run db:generate` | Gera migrations do Drizzle |
| `npm run db:migrate` | Aplica migrations pendentes |
| `npm run db:push` | Push direto do schema para o banco |
| `npm run db:studio` | Abre o Drizzle Studio |

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check do servidor |

## Estrutura

```
src/
├── db/
│   ├── connection.ts    # Conexão com PostgreSQL
│   └── schema/
│       ├── index.ts     # Export dos schemas
│       └── rooms.ts     # Schema da tabela rooms
├── env.ts               # Validação de variáveis de ambiente
└── server.ts            # Configuração e inicialização do Fastify
```

## Licença

MIT - [Diego Vieira](https://github.com/diegovieiradv)
