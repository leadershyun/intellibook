# Intellibook

AI-powered audio lecture starter project.

## Project structure

- `/apps/web`: Cloudflare Pages frontend (React + Vite)
- `/apps/api`: Cloudflare Workers backend (Hono)

## Local development

```bash
npm install
npm run dev:api
npm run dev:web
```

API endpoint example:

- `POST /api/topic-to-script` with body `{ "topic": "Your topic" }`
