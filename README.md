# NLW IA - Backend API

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://project-nlw-ia.vercel.app)

Backend API para o projeto NLW IA, construído com **Fastify**, **Drizzle ORM** e **PostgreSQL** com suporte a **pgvector** para embeddings vetoriais e **Grok (xAI)** para geração de respostas com RAG.

**🔗 Deploy:** https://project-nlw-ia.vercel.app

## Stack

- **Runtime:** Node.js com TypeScript nativo (`--experimental-strip-types`)
- **Framework:** Fastify v5
- **Banco de Dados:** PostgreSQL 17 + pgvector
- **ORM:** Drizzle ORM
- **IA:** Grok/xAI (embeddings + chat)
- **Validação:** Zod + fastify-type-provider-zod
- **Lint/Format:** Biome + Ultracite

## Pré-requisitos

- Node.js >= 22
- Docker
- Chave de API da xAI (Grok)

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

Configure a variável `XAI_API_KEY` no seu `.env` com sua chave da xAI.

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

### Salas

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/rooms` | Cria uma nova sala |
| `GET` | `/rooms` | Lista todas as salas |
| `GET` | `/rooms/:id` | Busca uma sala por ID |

**POST /rooms** - Body:
```json
{ "name": "Sala de estudos", "description": "Estudo de IA" }
```

### Mensagens

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/rooms/:roomId/messages` | Envia uma mensagem para a sala |
| `GET` | `/rooms/:roomId/messages` | Lista todas as mensagens da sala |

**POST /rooms/:roomId/messages** - Body:
```json
{ "content": "Olá, tudo bem?" }
```

### Perguntas com IA (RAG)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/rooms/:roomId/questions` | Faz uma pergunta sobre o contexto da sala |

**POST /rooms/:roomId/questions** - Body:
```json
{ "question": "O que foi falado sobre Docker?" }
```

A IA busca as mensagens mais relevantes da sala usando embeddings vetoriais e gera uma resposta contextualizada.

## Estrutura

```
src/
├── db/
│   ├── connection.ts        # Conexão com PostgreSQL
│   └── schema/
│       ├── index.ts         # Export dos schemas
│       ├── rooms.ts         # Schema da tabela rooms
│       └── messages.ts      # Schema da tabela messages
├── routes/
│   ├── rooms.ts             # Rotas CRUD de salas
│   └── messages.ts          # Rotas de mensagens e perguntas
├── services/
│   └── openai.ts            # Integração com OpenAI
├── env.ts                   # Validação de variáveis de ambiente
├── app.ts                   # Configuração do Fastify
└── server.ts                # Inicialização do servidor
```

## Licença

MIT - [Diego Vieira](https://github.com/diegovieiradv)
