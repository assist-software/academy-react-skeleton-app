import { Entity } from './projects-models.types'

export interface ProjectStep1FormData {
  name: string
  marketProblem: string
  objective: string
}

export interface AddPackageFormData {
  name: string
}

export interface AddEntityFormData {
  name: string
}

export interface PackageFormData {
  id?: number
  name: string
  entities: Entity[]
  showAllEntities: boolean
  showAddButton: boolean
  isLoadingAddEntity: boolean
}

export interface ProjectStep2FormData {
  packages: PackageFormData[]
}
