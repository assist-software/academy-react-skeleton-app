import { makeAutoObservable } from 'mobx'

import { GetItemsBasicFilters } from 'common/types/models.types'
import { Entity, Project } from '../types/projects-models.types'
import {
  AddEntityFormData,
  ProjectStep1FormData,
  ProjectStep2FormData,
} from '../types/projects-forms.types'
import {
  createEntity,
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../services/projects-api.service'

export class ProjectsStore {
  totalNumberOfProjects: number = 0
  projects: Project[] = []
  project: Project | null = null

  constructor() {
    makeAutoObservable(this)
  }

  private setTotalNumberOfProjects(totalNumberOfProjects: number) {
    this.totalNumberOfProjects = totalNumberOfProjects
  }

  private setProjects(projects: Project[]) {
    this.projects = projects
  }

  private setProject(project: Project | null) {
    this.project = project
  }

  loadProjects = async (filters: GetItemsBasicFilters) => {
    try {
      const { totalNumberOfProjects, projects } = await getProjects(filters)
      this.setTotalNumberOfProjects(totalNumberOfProjects)
      this.setProjects([...(filters.page === 1 ? [] : this.projects), ...projects])
    } catch (error) {
      this.setTotalNumberOfProjects(0)
      this.setProjects([])
      throw error
    }
  }

  loadProject = async (projectId: number) => {
    try {
      const project = await getProject(projectId)
      this.setProject(project)
    } catch (error) {
      this.setProject(null)
      throw error
    }
  }

  addProject = async (projectStep1FormData: ProjectStep1FormData): Promise<Project> => {
    const addedProject = await createProject(projectStep1FormData)
    this.setProject(addedProject)
    return addedProject
  }

  modifyProject = async (
    projectId: number,
    projectFormData: ProjectStep1FormData | ProjectStep2FormData,
  ) => {
    const updatedProject = await updateProject(projectId, projectFormData)
    this.setProject(updatedProject)
  }

  removeProject = async (projectId: number) => {
    await deleteProject(projectId)
    this.setTotalNumberOfProjects(this.totalNumberOfProjects - 1)
    this.setProjects(
      this.projects.filter(({ id }) => {
        return id !== projectId
      }),
    )
  }

  addEntity = async (addEntityFormData: AddEntityFormData): Promise<Entity> => {
    const addedEntity = await createEntity(addEntityFormData)
    return addedEntity
  }
}
