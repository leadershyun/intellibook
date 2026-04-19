import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  AUDIO_BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

app.get('/', (c) => c.json({ message: 'Hello from Intellibook API' }))

app.post('/api/topic-to-script', async (c) => {
  const body = await c.req.json<{ topic?: string }>()
  const topic = body.topic?.trim()

  if (!topic) {
    return c.json({ error: 'topic is required' }, 400)
  }

  const script = [
    `Welcome to Intellibook. Today we are exploring ${topic}.`,
    `${topic} is an important concept for developers and learners.`,
    `In this starter implementation, this script is generated as a placeholder for Copilot-powered generation.`
  ].join(' ')

  return c.json({ topic, script })
})

export default app
