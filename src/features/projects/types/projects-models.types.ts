export interface EntitiesBatch {
  name: string
  entities: string[]
}

export interface Project {
  id: string
  name: string
  marketProblem: string
  objective: string
  createdBy: string
  updatedAt: number
  numberOfDocuments: number
  collaborators: string[]
  entitiesBatches: EntitiesBatch[]
}
