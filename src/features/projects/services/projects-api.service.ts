// import axios from 'axios'

import { GetItemsBasicFilters } from 'common/types/models.types'
// import { generateFiltersQueryString } from 'common/services/utils.service'
import { Entity, GetProjectsApiResponse, Project } from '../types/projects-models.types'
import {
  AddEntityFormData,
  ProjectStep1FormData,
  ProjectStep2FormData,
} from '../types/projects-forms.types'

// const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const getProjects = async (
  filters: GetItemsBasicFilters,
): Promise<GetProjectsApiResponse> => {
  // const { data } = await axios.get<GetProjectsApiResponse>(
  //   `${BASE_URL}/projects?${generateFiltersQueryString(filters)}`,
  // )
  // return data

  return new Promise<GetProjectsApiResponse>((resolve) => {
    setTimeout(() => {
      const projects = [
        {
          id: 1,
          name: 'Project 1609221210',
          marketProblem: 'Sizing',
          objective: 'How big is the U.S. market for hard seltzer?',
          collaborators: [],
          updatedAt: 1663319426995,
          packages: [
            {
              id: 1,
              name: 'Associations',
              entities: [
                { id: 1, name: 'Brewers Association' },
                { id: 2, name: 'Beer Institute' },
              ],
            },
            {
              id: 2,
              name: 'Government',
              entities: [
                { id: 3, name: 'Consumer Spend' },
                { id: 4, name: 'Price index' },
              ],
            },
          ],
          numberOfDocuments: 0,
        },
        {
          id: 2,
          name: 'Project 1609221208',
          marketProblem: 'Segments',
          objective: 'How big is the U.S. market for hard seltzer?',
          collaborators: [],
          updatedAt: 1663319332317,
          packages: [
            {
              id: 3,
              name: 'Companies',
              entities: [
                { id: 5, name: 'Heineken' },
                { id: 6, name: 'Karlsberg' },
              ],
            },
            {
              id: 4,
              name: 'Brands',
              entities: [
                { id: 7, name: 'White Claw' },
                { id: 8, name: 'Topo Chico' },
              ],
            },
          ],
          numberOfDocuments: 0,
        },
        {
          id: 3,
          name: 'Project 1609221141',
          marketProblem: 'Learn',
          objective: 'How big is the U.S. market for hard seltzer?',
          collaborators: [],
          updatedAt: 1663317720525,
          packages: [
            {
              id: 5,
              name: 'Associations',
              entities: [
                { id: 9, name: 'Beer Institute' },
                { id: 10, name: 'NBWA' },
              ],
            },
            {
              id: 6,
              name: 'Companies',
              entities: [
                { id: 11, name: 'Smirnoff' },
                { id: 12, name: 'Natural Light' },
              ],
            },
            {
              id: 8,
              name: 'Government',
              entities: [
                { id: 13, name: 'Consumer Spend' },
                { id: 14, name: 'Price index' },
              ],
            },
          ],
          numberOfDocuments: 0,
        },
      ]
      const { page, pageSize } = filters
      const projectsApiResponse = {
        totalNumberOfProjects: 3,
        projects: projects.slice(pageSize * (page - 1), pageSize * page > 3 ? 3 : pageSize * page),
      }
      resolve(projectsApiResponse)
    }, 2000)
  })
}

export const getProject = async (projectId: number): Promise<Project> => {
  // const { data } = await axios.get<Project>(`${BASE_URL}/projects/${projectId}`)
  // return data

  return new Promise<Project>((resolve) => {
    setTimeout(() => {
      const project = {
        id: 1,
        name: 'Project 1609221210',
        marketProblem: 'Sizing',
        objective: 'How big is the U.S. market for hard seltzer?',
        collaborators: [],
        updatedAt: 1663319426995,
        packages: [
          {
            id: 1,
            name: 'Associations',
            entities: [
              { id: 1, name: 'Brewers Association' },
              { id: 2, name: 'Beer Institute' },
            ],
          },
          {
            id: 2,
            name: 'Government',
            entities: [
              { id: 3, name: 'Consumer Spend' },
              { id: 4, name: 'Price index' },
            ],
          },
        ],
        numberOfDocuments: 0,
      }
      resolve(project)
    }, 2000)
  })
}

export const createProject = async (
  projectStep1FormData: ProjectStep1FormData,
): Promise<Project> => {
  // const { data } = await axios.post<Project>(`${BASE_URL}/projects`, projectStep1FormData)
  // return data

  return new Promise<Project>((resolve) => {
    setTimeout(() => {
      const project = {
        id: 4,
        name: 'Project 2110220911',
        marketProblem: 'Sizing',
        objective: 'How big is the U.S. market for hard seltzer?',
        collaborators: [],
        updatedAt: 1666332697000,
        packages: [
          {
            id: 9,
            name: 'Associations',
            entities: [
              { id: 15, name: 'Brewers Association' },
              { id: 16, name: 'Beer Institute' },
            ],
          },
          {
            id: 10,
            name: 'Government',
            entities: [
              { id: 17, name: 'Consumer Spend' },
              { id: 18, name: 'Price index' },
            ],
          },
        ],
        numberOfDocuments: 0,
      }
      resolve(project)
    }, 2000)
  })
}

export const updateProject = async (
  projectId: number,
  projectFormData: ProjectStep1FormData | ProjectStep2FormData,
): Promise<Project> => {
  // const { data } = await axios.put<Project>(`${BASE_URL}/projects/${projectId}`, projectFormData)
  // return data

  return new Promise<Project>((resolve) => {
    setTimeout(() => {
      const project = {
        id: 4,
        name: 'Project 2110220911',
        marketProblem: 'Sizing',
        objective: 'How big is the U.S. market for hard seltzer?',
        collaborators: [],
        updatedAt: 1666332697000,
        packages: [
          {
            id: 9,
            name: 'Associations',
            entities: [
              { id: 15, name: 'Brewers Association' },
              { id: 16, name: 'Beer Institute' },
            ],
          },
          {
            id: 10,
            name: 'Government',
            entities: [
              { id: 17, name: 'Consumer Spend' },
              { id: 18, name: 'Price index' },
            ],
          },
        ],
        numberOfDocuments: 0,
      }
      resolve(project)
    }, 2000)
  })
}

export const deleteProject = async (projectId: number): Promise<void> => {
  // await axios.delete(`${BASE_URL}/projects/${projectId}`)

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 2000)
  })
}

export const createEntity = async (addEntityFormData: AddEntityFormData): Promise<Entity> => {
  // const { data } = await axios.post<Entity>(`${BASE_URL}/entities`, addEntityFormData)
  // return data

  return new Promise<Entity>((resolve) => {
    setTimeout(() => {
      const entity = {
        id: 19,
        name: 'Bermas',
      }
      resolve(entity)
    }, 2000)
  })
}
