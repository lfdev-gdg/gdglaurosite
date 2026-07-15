export interface Job {
  title: string
  company: string
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista'
  tech: string
}

export interface SocialProject {
  title: string
  description: string
  techs: string[]
}
