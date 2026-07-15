import type { SocialProject } from '@/types/job'
import type { FilterStrategy, FilterCriteria } from './types'

export class ProjectsFilterStrategy implements FilterStrategy<SocialProject> {
  apply(projects: SocialProject[], criteria: FilterCriteria): SocialProject[] {
    let result = projects

    if (criteria.tech) {
      result = result.filter((project) =>
        project.techs.some((t) =>
          t.toLowerCase().includes(criteria.tech!.toLowerCase()),
        ),
      )
    }

    if (criteria.query) {
      const q = criteria.query.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q),
      )
    }

    return result
  }
}
