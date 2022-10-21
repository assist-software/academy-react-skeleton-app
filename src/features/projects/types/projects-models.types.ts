export interface Entity {
  id: number
  name: string
}

export interface Package {
  id: number
  name: string
  entities: Entity[]
}

export interface Project {
  id: number
  name: string
  marketProblem: string
  objective: string
  collaborators: string[]
  updatedAt: number
  packages: Package[]
  numberOfDocuments: number
}

export interface GetProjectsApiResponse {
  totalNumberOfProjects: number
  projects: Project[]
}
