import axios from 'axios'

import { Project } from '../types/projects-models.types'
import { ProjectStep1FormData, ProjectStep2FormData } from '../types/projects-forms.types'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get<Project[]>(`${BASE_URL}/projects`)
  return data
}

export const getProject = async (projectId: string): Promise<Project> => {
  const { data } = await axios.get<Project>(`${BASE_URL}/projects/${projectId}`)
  return data
}

export const createProject = async (
  projectStep1FormData: ProjectStep1FormData,
): Promise<Project> => {
  const { data } = await axios.post<Project>(`${BASE_URL}/projects`, projectStep1FormData)
  return data
}

export const updateProject = async (
  projectId: string,
  projectFormData: ProjectStep1FormData | ProjectStep2FormData,
): Promise<Project> => {
  const { data } = await axios.put<Project>(`${BASE_URL}/projects/${projectId}`, projectFormData)
  return data
}

export const deleteProject = async (projectId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/projects/${projectId}`)
}
