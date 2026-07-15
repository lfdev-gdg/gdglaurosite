'use client'

import { useState, useEffect } from 'react'
import { addJob, getJobs, deleteJob } from '@/services/jobs'
import { addProject, getProjects, deleteProject } from '@/services/projects'
import type { Job, SocialProject } from '@/types/job'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'gdglauro2026'

type Tab = 'vagas' | 'projetos'

const btnBase =
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md`

const btnDanger =
  'rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-all duration-150 hover:bg-red-400/10 hover:text-red-300 active:scale-95'

const inputClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState<Tab>('vagas')
  const [jobs, setJobs] = useState<(Job & { id: string })[]>([])
  const [projects, setProjects] = useState<(SocialProject & { id: string })[]>([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const [jobForm, setJobForm] = useState({ title: '', company: '', tech: '', level: 'Júnior' as Job['level'] })
  const [projectForm, setProjectForm] = useState({ title: '', description: '', techsInput: '' })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

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
      setMessageType('error')
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
      setMessageType('success')
    } catch {
      setMessage('Erro ao cadastrar vaga')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteJob(id: string) {
    setDeleting(id)
    await deleteJob(id)
    await loadJobs()
    setDeleting(null)
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
      setMessageType('success')
    } catch {
      setMessage('Erro ao cadastrar projeto')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteProject(id: string) {
    setDeleting(id)
    await deleteProject(id)
    await loadProjects()
    setDeleting(null)
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-center text-xl font-semibold text-foreground">Admin — GDG Lauro</h1>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
          <button type="submit" className={`${btnPrimary} w-full px-4 py-2.5`}>
            Entrar
          </button>
          {message && (
            <p className={`text-center text-sm ${messageType === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-foreground">Admin — GDG Lauro</h1>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthorized(false) }}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground active:scale-95"
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
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
                tab === t
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground'
              }`}
            >
              {t === 'vagas' ? 'Vagas' : 'Projetos Sociais'}
            </button>
          ))}
        </div>

        {message && (
          <div
            className={`mb-6 animate-in rounded-lg border px-4 py-3 text-sm ${
              messageType === 'success'
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                : 'border-red-500/20 bg-red-500/10 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        {tab === 'vagas' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={handleAddJob} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Nova Vaga</h2>
              <input required placeholder="Título da vaga" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} className={inputClass} />
              <input required placeholder="Empresa" value={jobForm.company} onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })} className={inputClass} />
              <input required placeholder="Tecnologia (ex: React, Python)" value={jobForm.tech} onChange={(e) => setJobForm({ ...jobForm, tech: e.target.value })} className={inputClass} />
              <select required value={jobForm.level} onChange={(e) => setJobForm({ ...jobForm, level: e.target.value as Job['level'] })} className={inputClass}>
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
                <option value="Especialista">Especialista</option>
              </select>
              <button type="submit" disabled={loading} className={`${btnPrimary} w-full px-4 py-2.5`}>
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Salvando...
                  </span>
                ) : (
                  'Cadastrar Vaga'
                )}
              </button>
            </form>

            <div className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Vagas Cadastradas ({jobs.length})</h2>
              {jobs.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma vaga cadastrada ainda.</p>
              ) : (
                <div className="space-y-2">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-all duration-150 hover:border-primary/20 hover:shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{job.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {job.company} · {job.tech} · {job.level}
                        </p>
                      </div>
                      <button
                        onClick={() => job.id && handleDeleteJob(job.id)}
                        disabled={deleting === job.id}
                        className={btnDanger}
                      >
                        {deleting === job.id ? '...' : 'Remover'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'projetos' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={handleAddProject} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Novo Projeto Social</h2>
              <input required placeholder="Título do projeto" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className={inputClass} />
              <textarea required rows={3} placeholder="Descrição" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className={inputClass} />
              <input required placeholder="Tecnologias (separadas por vírgula)" value={projectForm.techsInput} onChange={(e) => setProjectForm({ ...projectForm, techsInput: e.target.value })} className={inputClass} />
              <button type="submit" disabled={loading} className={`${btnPrimary} w-full px-4 py-2.5`}>
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Salvando...
                  </span>
                ) : (
                  'Cadastrar Projeto'
                )}
              </button>
            </form>

            <div className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Projetos Cadastrados ({projects.length})</h2>
              {projects.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
              ) : (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-all duration-150 hover:border-primary/20 hover:shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{project.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {project.techs.join(', ')}
                        </p>
                      </div>
                      <button
                        onClick={() => project.id && handleDeleteProject(project.id)}
                        disabled={deleting === project.id}
                        className={btnDanger}
                      >
                        {deleting === project.id ? '...' : 'Remover'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
