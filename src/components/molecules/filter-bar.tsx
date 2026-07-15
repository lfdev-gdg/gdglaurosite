'use client'

import { useState } from 'react'
import type { FilterCriteria } from '@/lib/filters'

interface FilterBarProps {
  onFilterChange: (criteria: FilterCriteria) => void
  showLevel?: boolean
}

export function FilterBar({ onFilterChange, showLevel = false }: FilterBarProps) {
  const [tech, setTech] = useState('')
  const [level, setLevel] = useState('')
  const [query, setQuery] = useState('')

  function handleChange() {
    onFilterChange({
      tech: tech || undefined,
      level: level || undefined,
      query: query || undefined,
    })
  }

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onFilterChange({
            tech: tech || undefined,
            level: level || undefined,
            query: e.target.value || undefined,
          })
        }}
        className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <input
        type="text"
        placeholder="Tecnologia"
        value={tech}
        onChange={(e) => {
          setTech(e.target.value)
          onFilterChange({
            tech: e.target.value || undefined,
            level: level || undefined,
            query: query || undefined,
          })
        }}
        className="w-36 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {showLevel && (
        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value)
            onFilterChange({
              tech: tech || undefined,
              level: e.target.value || undefined,
              query: query || undefined,
            })
          }}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Nível</option>
          <option value="Júnior">Júnior</option>
          <option value="Pleno">Pleno</option>
          <option value="Sênior">Sênior</option>
          <option value="Especialista">Especialista</option>
        </select>
      )}
    </div>
  )
}
