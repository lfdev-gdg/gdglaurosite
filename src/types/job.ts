export interface Job {
  id?: string
  title: string
  company: string
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista'
  tech: string
}

export interface SocialProject {
  id?: string
  title: string
  description: string
  techs: string[]
}
