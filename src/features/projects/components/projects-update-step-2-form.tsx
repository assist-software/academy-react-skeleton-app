import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { useStore } from 'common/store/store'
import { ActionButton } from 'common/components/action-button'
import { MoreActionsButton } from 'common/components/more-actions-button'
import { GenericChip } from 'common/components/generic-chip'
import { NoDataFound } from 'common/components/no-data-found'
import { EntitiesBatch } from '../types/projects-models.types'

interface ProjectsUpdateStep2FormProps {
  id: string
}

export const ProjectsUpdateStep2Form = observer(
  ({ id: targetedProjectId }: ProjectsUpdateStep2FormProps) => {
    const { notifierStore } = useStore()
    const { projectsStore } = useStore()

    const { modifyProject, project } = projectsStore

    const [projectEntitiesBatches, setProjectEntitiesBatches] = useState<EntitiesBatch[]>([])
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [isLoadingModifyProject, setIsLoadingModifyProject] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
      ;(async () => {
        try {
          if (!project || project.id !== targetedProjectId) {
            await projectsStore.loadProject(targetedProjectId)
          }
        } catch (error) {
          notifierStore.pushMessage({
            severity: 'error',
            detail: `An error occurred while loading the project: ${error.message}`,
          })
        } finally {
          setIsLoadingProject(false)
        }
      })()
    }, [])

    useEffect(() => {
      if (project) {
        setProjectEntitiesBatches(project.entitiesBatches)
      }
    }, [project])

    const modifyProjectHandler = async () => {
      try {
        setIsLoadingModifyProject(true)

        await modifyProject(targetedProjectId, { entitiesBatches: projectEntitiesBatches })

        notifierStore.pushMessage({
          severity: 'success',
          detail: `The project was updated successfully.`,
        })

        navigate('/projects')
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while updating the project: ${error.message}`,
        })
      } finally {
        setIsLoadingModifyProject(false)
      }
    }

    const removeEntitiesBatch = (entitiesBatchName: string) => {
      setProjectEntitiesBatches(
        projectEntitiesBatches.filter(({ name }) => name !== entitiesBatchName),
      )
    }

    const removeEntityFromBatch = (entitiesBatchName: string, entityToRemove: string) => {
      const projectEntitiesBatchesCopy = [...projectEntitiesBatches]

      const entitiesBatch = projectEntitiesBatchesCopy.find(({ name }) => {
        return name === entitiesBatchName
      })

      if (!entitiesBatch) {
        return
      }

      entitiesBatch.entities = entitiesBatch.entities.filter((entity) => {
        return entity !== entityToRemove
      })

      setProjectEntitiesBatches(projectEntitiesBatchesCopy)
    }

    let entitiesBatchesContent: JSX.Element

    if (isLoadingProject) {
      entitiesBatchesContent = (
        <>
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <Skeleton width='180px' className='mb-2' />
              <Skeleton height='90px' className='mb-4' />
            </React.Fragment>
          ))}
        </>
      )
    } else if (projectEntitiesBatches.length === 0) {
      entitiesBatchesContent = <NoDataFound>Project data not found</NoDataFound>
    } else {
      entitiesBatchesContent = (
        <>
          {projectEntitiesBatches.map(({ name, entities }) => {
            const entitiesBatchMenuModel = [
              {
                items: [
                  {
                    label: 'Remove',
                    command: () => {
                      removeEntitiesBatch(name)
                    },
                  },
                ],
              },
            ]

            return (
              <div key={name}>
                <div className='flex align-items-center mb-4'>
                  <h2 className='mr-3'>{name}</h2>

                  <ActionButton
                    icon='pi pi-plus'
                    className='mr-1'
                    onClick={() => {
                      console.log(`WIP: Add batch logic`)
                    }}
                  />

                  <MoreActionsButton menuModel={entitiesBatchMenuModel} />
                </div>

                <div>
                  {entities.map((entity) => {
                    const entityMenuModel = [
                      {
                        items: [
                          {
                            label: 'Remove',
                            command: () => {
                              removeEntityFromBatch(name, entity)
                            },
                          },
                        ],
                      },
                    ]

                    return (
                      <GenericChip
                        key={entity}
                        label={entity}
                        menuModel={entityMenuModel}
                        className='mr-2 mb-2'
                      />
                    )
                  })}
                </div>

                <Divider />
              </div>
            )
          })}
        </>
      )
    }

    return (
      <Card>
        {entitiesBatchesContent}

        <div className='flex justify-content-between align-items-center'>
          <Link to={`/update-project-step-1/${targetedProjectId}`} className='text-600'>
            &#60; Back to project setup
          </Link>

          <Button
            type='button'
            label='Get data'
            iconPos='right'
            loading={isLoadingModifyProject}
            onClick={() => {
              modifyProjectHandler()
            }}
          />
        </div>
      </Card>
    )
  },
)
