'use client'

import { useState, useEffect } from 'react'
import { addJob, getJobs, deleteJob } from '@/services/jobs'
import { addProject, getProjects, deleteProject } from '@/services/projects'
import type { Job, SocialProject } from '@/types/job'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'gdglauro2026'

type Tab = 'vagas' | 'projetos'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState<Tab>('vagas')
  const [jobs, setJobs] = useState<(Job & { id: string })[]>([])
  const [projects, setProjects] = useState<(SocialProject & { id: string })[]>([])
  const [loading, setLoading] = useState(false)

  const [jobForm, setJobForm] = useState({ title: '', company: '', tech: '', level: 'Júnior' as Job['level'] })
  const [projectForm, setProjectForm] = useState({ title: '', description: '', techsInput: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_auth')
    if (stored === ADMIN_PASSWORD) {
      setAuthorized(true)
    }
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', password)
      setAuthorized(true)
    } else {
      setMessage('Senha incorreta')
    }
  }

  async function loadJobs() {
    const data = await getJobs()
    setJobs(data)
  }

  async function loadProjects() {
    const data = await getProjects()
    setProjects(data)
  }

  useEffect(() => {
    if (authorized) {
      loadJobs()
      loadProjects()
    }
  }, [authorized])

  async function handleAddJob(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await addJob(jobForm)
      setJobForm({ title: '', company: '', tech: '', level: 'Júnior' })
      await loadJobs()
      setMessage('Vaga cadastrada com sucesso!')
    } catch {
      setMessage('Erro ao cadastrar vaga')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteJob(id: string) {
    await deleteJob(id)
    await loadJobs()
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const techs = projectForm.techsInput.split(',').map((t) => t.trim()).filter(Boolean)
      await addProject({ title: projectForm.title, description: projectForm.description, techs })
      setProjectForm({ title: '', description: '', techsInput: '' })
      await loadProjects()
      setMessage('Projeto cadastrado com sucesso!')
    } catch {
      setMessage('Erro ao cadastrar projeto')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteProject(id: string) {
    await deleteProject(id)
    await loadProjects()
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-8">
          <h1 className="text-center text-xl font-semibold text-foreground">Admin — GDG Lauro</h1>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Entrar
          </button>
          {message && <p className="text-center text-sm text-red-400">{message}</p>}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-foreground">Admin — GDG Lauro</h1>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthorized(false) }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex gap-2">
          {(['vagas', 'projetos'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t === 'vagas' ? 'Vagas' : 'Projetos Sociais'}
            </button>
          ))}
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-border bg-card p-4 text-sm text-foreground">
            {message}
          </div>
        )}

        {tab === 'vagas' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={handleAddJob} className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Nova Vaga</h2>
              <input
                required
                placeholder="Título da vaga"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                required
                placeholder="Empresa"
                value={jobForm.company}
                onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                required
                placeholder="Tecnologia (ex: React, Python)"
                value={jobForm.tech}
                onChange={(e) => setJobForm({ ...jobForm, tech: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <select
                required
                value={jobForm.level}
                onChange={(e) => setJobForm({ ...jobForm, level: e.target.value as Job['level'] })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
                <option value="Especialista">Especialista</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Cadastrar Vaga'}
              </button>
            </form>

            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Vagas Cadastradas ({jobs.length})</h2>
              {jobs.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma vaga cadastrada ainda.</p>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company} · {job.tech} · {job.level}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === 'projetos' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={handleAddProject} className="space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Novo Projeto Social</h2>
              <input
                required
                placeholder="Título do projeto"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <textarea
                required
                rows={3}
                placeholder="Descrição"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                required
                placeholder="Tecnologias (separadas por vírgula)"
                value={projectForm.techsInput}
                onChange={(e) => setProjectForm({ ...projectForm, techsInput: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Cadastrar Projeto'}
              </button>
            </form>

            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Projetos Cadastrados ({projects.length})</h2>
              {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{project.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.techs.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
