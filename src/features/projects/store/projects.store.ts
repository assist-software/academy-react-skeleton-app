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
  wipLoadProjects: boolean = false
  wipLoadProjectsPage: boolean = false
  wipLoadProject: boolean = false
  wipRemoveProjectIds: number[] = []
  wipAddProject: boolean = false
  wipModifyProject: boolean = false

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

  private setWipLoadProjects(wip: boolean) {
    this.wipLoadProjects = wip
  }

  private setWipLoadProjectsPage(wip: boolean) {
    this.wipLoadProjectsPage = wip
  }

  private setWipLoadProject(wip: boolean) {
    this.wipLoadProject = wip
  }

  private setWipRemoveProjectIds(wipIds: number[]) {
    this.wipRemoveProjectIds = wipIds
  }

  private setWipAddProject(wip: boolean) {
    this.wipAddProject = wip
  }

  private setWipModifyProject(wip: boolean) {
    this.wipModifyProject = wip
  }

  loadProjects = async (filters: GetItemsBasicFilters) => {
    if (this.wipLoadProjectsPage) {
      return
    }

    this.setWipLoadProjectsPage(true)
    if (filters.page === 1) {
      this.setWipLoadProjects(true)
      this.setTotalNumberOfProjects(0)
      this.setProjects([])
    }

    const { totalNumberOfProjects, projects } = await getProjects(filters)

    this.setTotalNumberOfProjects(totalNumberOfProjects)
    this.setProjects([...this.projects, ...projects])
    this.setWipLoadProjectsPage(false)
    this.setWipLoadProjects(false)
  }

  loadProject = async (projectId: number) => {
    if (this.wipLoadProject) {
      return
    }

    this.setWipLoadProject(true)
    this.setProject(null)

    const project = await getProject(projectId)

    this.setProject(project)
    this.setWipLoadProject(false)
  }

  addProject = async (projectStep1FormData: ProjectStep1FormData): Promise<Project> => {
    try {
      this.setWipAddProject(true)

      const addedProject = await createProject(projectStep1FormData)

      this.setProject(addedProject)

      return addedProject
    } catch (error) {
      throw error
    } finally {
      this.setWipAddProject(false)
    }
  }

  modifyProject = async (
    projectId: number,
    projectFormData: ProjectStep1FormData | ProjectStep2FormData,
  ) => {
    try {
      this.setWipModifyProject(true)

      const updatedProject = await updateProject(projectId, projectFormData)

      this.setProject(updatedProject)
    } catch (error) {
      throw error
    } finally {
      this.setWipModifyProject(false)
    }
  }

  removeProject = async (projectId: number) => {
    try {
      this.setWipRemoveProjectIds([...this.wipRemoveProjectIds, projectId])

      await deleteProject(projectId)

      this.setTotalNumberOfProjects(this.totalNumberOfProjects - 1)
      this.setProjects(
        this.projects.filter(({ id }) => {
          return id !== projectId
        }),
      )
    } catch (error) {
      throw error
    } finally {
      this.setWipRemoveProjectIds(
        this.wipRemoveProjectIds.filter((id) => {
          return id !== projectId
        }),
      )
    }
  }

  addEntity = async (addEntityFormData: AddEntityFormData): Promise<Entity> => {
    const addedEntity = await createEntity(addEntityFormData)
    return addedEntity
  }
}
