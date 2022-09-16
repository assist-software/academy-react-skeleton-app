// import axios from 'axios'

import { Project } from '../types/projects-models.types'
import { ProjectStep1FormData, ProjectStep2FormData } from '../types/projects-forms.types'

// const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const getProjects = async (): Promise<Project[]> => {
  // const { data } = await axios.get<Project[]>(`${BASE_URL}/projects`)
  // return data

  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      const projects = [
        {
          entitiesBatches: [
            { name: 'Associations', entities: ['Brewers Association', 'Beer Institute', 'NBWA'] },
            {
              name: 'Government',
              entities: ['Consumer Spend', 'Price index', 'Production', 'Deciles'],
            },
          ],
          updatedAt: 1663319426995,
          objective: 'How big is the U.S. market for hard seltzer?',
          marketProblem: 'Sizing',
          id: '1395454c-a8e5-43dd-ac3e-779e2e8b085d',
          createdBy: 'cont.test@assist.ro',
          name: 'Project 1609221210',
          collaborators: [],
          numberOfDocuments: 0,
        },
        {
          entitiesBatches: [
            {
              name: 'Companies',
              entities: [
                'Boston Beer',
                'AB Inbev',
                'Heineken',
                'Karlsberg',
                'Molson Coors',
                'Anheiser Busch',
                'Bon & Liv',
                'Vizzy Hard Seltzer',
                'Smirnoff',
                'Natural Light',
                'Kirkland Brand',
                'Topo Chico (Coca Cola)',
                "Henry's",
              ],
            },
            {
              name: 'Brands',
              entities: ['Truly', 'White Claw', 'Topo Chico', 'Bud Light Seltzer', 'Kegs'],
            },
          ],
          updatedAt: 1663319332317,
          objective: 'How big is the U.S. market for hard seltzer?',
          marketProblem: 'Segments',
          id: '4d132e13-fac7-4838-b384-cd6beca680a3',
          createdBy: 'cont.test@assist.ro',
          name: 'Project 1609221208',
          collaborators: [],
          numberOfDocuments: 0,
        },
        {
          entitiesBatches: [
            { name: 'Associations', entities: ['Brewers Association', 'Beer Institute', 'NBWA'] },
            {
              name: 'Companies',
              entities: [
                'Boston Beer',
                'AB Inbev',
                'Heineken',
                'Karlsberg',
                'Molson Coors',
                'Anheiser Busch',
                'Bon & Liv',
                'Vizzy Hard Seltzer',
                'Smirnoff',
                'Natural Light',
                'Kirkland Brand',
                'Topo Chico (Coca Cola)',
                "Henry's",
              ],
            },
            {
              name: 'Themes',
              entities: [
                'Craft brewing',
                'Top holidays',
                'United States Craft Beer Market',
                'Distribution',
                'ESG',
              ],
            },
            {
              name: 'Government',
              entities: ['Consumer Spend', 'Price index', 'Production', 'Deciles'],
            },
            {
              name: 'Brands',
              entities: ['Truly', 'White Claw', 'Topo Chico', 'Bud Light Seltzer', 'Kegs'],
            },
            { name: 'Add a proxy', entities: ['Proxy1', 'proxy2'] },
          ],
          updatedAt: 1663317720525,
          objective: 'How big is the U.S. market for hard seltzer?',
          marketProblem: 'Learn',
          id: 'be10fcfe-c9fe-422d-8efc-0ea76a12a9f0',
          createdBy: 'cont.test@assist.ro',
          name: 'Project 1609221141',
          collaborators: [],
          numberOfDocuments: 0,
        },
      ]
      resolve(projects)
    }, 2000)
  })
}

export const getProject = async (projectId: string): Promise<Project> => {
  // const { data } = await axios.get<Project>(`${BASE_URL}/projects/${projectId}`)
  // return data

  return new Promise<Project>((resolve) => {
    setTimeout(() => {
      const project = {
        entitiesBatches: [
          { name: 'Associations', entities: ['Brewers Association', 'Beer Institute', 'NBWA'] },
          {
            name: 'Government',
            entities: ['Consumer Spend', 'Price index', 'Production', 'Deciles'],
          },
        ],
        updatedAt: 1663319426995,
        objective: 'How big is the U.S. market for hard seltzer?',
        marketProblem: 'Sizing',
        id: '1395454c-a8e5-43dd-ac3e-779e2e8b085d',
        createdBy: 'cont.test@assist.ro',
        name: 'Project 1609221210',
        collaborators: [],
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
        entitiesBatches: [
          { name: 'Associations', entities: ['Brewers Association', 'Beer Institute', 'NBWA'] },
          {
            name: 'Government',
            entities: ['Consumer Spend', 'Production', 'Deciles'],
          },
        ],
        updatedAt: 1663319426995,
        objective: 'How big is the U.S. market for hard seltzer?',
        marketProblem: 'Sizing',
        id: '1395454c-a8e5-43dd-ac3e-779e2e8b085d',
        createdBy: 'cont.test@assist.ro',
        name: 'Project 1609221210',
        collaborators: [],
        numberOfDocuments: 0,
      }
      resolve(project)
    }, 2000)
  })
}

export const updateProject = async (
  projectId: string,
  projectFormData: ProjectStep1FormData | ProjectStep2FormData,
): Promise<Project> => {
  // const { data } = await axios.put<Project>(`${BASE_URL}/projects/${projectId}`, projectFormData)
  // return data

  return new Promise<Project>((resolve) => {
    setTimeout(() => {
      const project = {
        entitiesBatches: [
          { name: 'Associations', entities: ['Brewers Association', 'Beer Institute', 'NBWA'] },
          {
            name: 'Government',
            entities: ['Consumer Spend', 'Production', 'Deciles'],
          },
        ],
        updatedAt: 1663319426995,
        objective: 'How big is the U.S. market for hard seltzer?',
        marketProblem: 'Sizing',
        id: '1395454c-a8e5-43dd-ac3e-779e2e8b085d',
        createdBy: 'cont.test@assist.ro',
        name: 'Project 1609221210',
        collaborators: [],
        numberOfDocuments: 0,
      }
      resolve(project)
    }, 2000)
  })
}

export const deleteProject = async (projectId: string): Promise<void> => {
  // await axios.delete(`${BASE_URL}/projects/${projectId}`)

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 2000)
  })
}
