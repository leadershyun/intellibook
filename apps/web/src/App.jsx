import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8787'

export function App() {
  const [topic, setTopic] = useState('')
  const [script, setScript] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setScript('')

    if (!topic.trim()) {
      setError('Please enter a topic.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/topic-to-script`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error ?? 'Failed to generate script.')
        return
      }

      setScript(data.script)
    } catch {
      setError('Unable to reach API. Start the worker on localhost:8787 or set VITE_API_BASE_URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 720, margin: '3rem auto', padding: '0 1rem' }}>
      <h1>Intellibook</h1>
      <p>AI-powered audio lecture starter. Enter a topic to generate a sample lecture script.</p>

      <form onSubmit={submit}>
        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="e.g. Intro to Cloudflare Workers"
          style={{ display: 'block', width: '100%', marginTop: 8, padding: 10, boxSizing: 'border-box' }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 12, padding: '10px 16px' }}>
          {loading ? 'Generating...' : 'Generate Script'}
        </button>
      </form>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      {script ? (
        <section style={{ marginTop: 20 }}>
          <h2>Generated Script</h2>
          <p>{script}</p>
        </section>
      ) : null}
    </main>
  )
}
