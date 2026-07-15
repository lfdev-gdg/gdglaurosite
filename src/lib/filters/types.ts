export interface FilterCriteria {
  tech?: string
  level?: string
  query?: string
}

export interface FilterStrategy<T> {
  apply(items: T[], criteria: FilterCriteria): T[]
}

export class FilterContext<T> {
  private strategies: FilterStrategy<T>[] = []

  addStrategy(strategy: FilterStrategy<T>): void {
    this.strategies.push(strategy)
  }

  execute(items: T[], criteria: FilterCriteria): T[] {
    return this.strategies.reduce(
      (result, strategy) => strategy.apply(result, criteria),
      items,
    )
  }
}
