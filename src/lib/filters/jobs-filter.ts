import type { Job } from '@/types/job'
import type { FilterStrategy, FilterCriteria } from './types'

export class JobsFilterStrategy implements FilterStrategy<Job> {
  apply(jobs: Job[], criteria: FilterCriteria): Job[] {
    let result = jobs

    if (criteria.tech) {
      result = result.filter((job) =>
        job.tech.toLowerCase().includes(criteria.tech!.toLowerCase()),
      )
    }

    if (criteria.level) {
      result = result.filter(
        (job) => job.level.toLowerCase() === criteria.level!.toLowerCase(),
      )
    }

    if (criteria.query) {
      const q = criteria.query.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q),
      )
    }

    return result
  }
}
