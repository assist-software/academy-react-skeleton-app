import { makeAutoObservable } from 'mobx'

import { Project } from '../types/projects-models.types'
import { ProjectStep1FormData, ProjectStep2FormData } from '../types/projects-forms.types'
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../services/projects-api.service'

export class ProjectsStore {
  projects: Project[] = []
  project: Project | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setProjects(projects: Project[]) {
    this.projects = projects
  }

  setProject(project: Project | null) {
    this.project = project
  }

  loadProjects = async () => {
    try {
      const projects = await getProjects()
      this.setProjects(projects)
    } catch (error) {
      this.setProjects([])
      throw error
    }
  }

  loadProject = async (projectId: string) => {
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
    projectId: string,
    projectFormData: ProjectStep1FormData | ProjectStep2FormData,
  ) => {
    const updatedProject = await updateProject(projectId, projectFormData)
    this.setProject(updatedProject)
  }

  removeProject = async (projectId: string) => {
    await deleteProject(projectId)
    this.setProjects(
      this.projects.filter(({ id }) => {
        return id !== projectId
      }),
    )
  }
}
