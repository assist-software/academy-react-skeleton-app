import { EntitiesBatch } from './projects-models.types'

export interface ProjectStep1FormData {
  name: string
  marketProblem: string
  objective: string
}

export interface ProjectStep2FormData {
  entitiesBatches: EntitiesBatch[]
}
