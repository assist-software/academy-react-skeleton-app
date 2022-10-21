import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import {
  getFormikFormFieldErrorMessage,
  isFormikFormFieldInvalid,
} from 'common/services/utils.service'
import { useStore } from 'common/store/store'
import { MoreActionsButton } from 'common/components/more-actions-button'
import { GenericChip } from 'common/components/generic-chip'
import { GenericChipInputText } from 'common/components/generic-chip-input-text'
import { GenericChipButton } from 'common/components/generic-chip-button'
import { numberOfEntitiesDisplayedPerPackage } from '../constants/projects.const'
import { Entity, Project } from '../types/projects-models.types'
import {
  AddEntityFormData,
  AddPackageFormData,
  PackageFormData,
} from '../types/projects-forms.types'

interface ProjectsUpdateStep2FormProps {
  id: number
}

export const ProjectsUpdateStep2Form = observer(
  ({ id: targetedProjectId }: ProjectsUpdateStep2FormProps) => {
    const { notifierStore, projectsStore } = useStore()

    const { addEntity, modifyProject, project } = projectsStore

    const [projectPackages, setProjectPackages] = useState<PackageFormData[]>([])
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
        const projectCopy = JSON.parse(JSON.stringify(project)) as Project
        setProjectPackages(
          projectCopy.packages.map((projectPackage) => ({
            ...projectPackage,
            showAllEntities: false,
            showAddButton: true,
            isLoadingAddEntity: false,
          })),
        )
      }
    }, [project])

    const modifyProjectHandler = async () => {
      try {
        setIsLoadingModifyProject(true)

        await modifyProject(targetedProjectId, { packages: projectPackages })

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

    const removePackageHandler = (packageName: string) => {
      setProjectPackages((prevProjectPackages) =>
        prevProjectPackages.filter(({ name }) => name !== packageName),
      )
    }

    const removeEntityFromPackageHandler = (packageName: string, entityIdToRemove: number) => {
      setProjectPackages((prevProjectPackages) => {
        const projectPackagesCopy = [...prevProjectPackages]

        const targetedPackage = projectPackagesCopy.find(({ name }) => {
          return name === packageName
        })

        if (!targetedPackage) {
          return prevProjectPackages
        }

        targetedPackage.entities = targetedPackage.entities.filter(({ id }) => {
          return id !== entityIdToRemove
        })

        return projectPackagesCopy
      })
    }

    const showAddEntityInputHandler = (packageName: string) => {
      setProjectPackages((prevProjectPackages) => {
        const projectPackagesCopy = [...prevProjectPackages]

        const targetedPackage = projectPackagesCopy.find(({ name }) => {
          return name === packageName
        })

        if (!targetedPackage) {
          return prevProjectPackages
        }

        targetedPackage.showAddButton = false

        return projectPackagesCopy
      })
    }

    const toggleShowAllEntitiesHandler = (packageName: string) => {
      setProjectPackages((prevProjectPackages) => {
        const projectPackagesCopy = [...prevProjectPackages]

        const targetedPackage = projectPackagesCopy.find(({ name }) => {
          return name === packageName
        })

        if (!targetedPackage) {
          return prevProjectPackages
        }

        targetedPackage.showAllEntities = !targetedPackage.showAllEntities

        return projectPackagesCopy
      })
    }

    const onSubmitAddPackageHandler = (packageName: string): void => {
      setProjectPackages((prevProjectPackages) => {
        const projectPackagesCopy = [...prevProjectPackages]
        projectPackagesCopy.unshift({
          name: packageName,
          entities: [],
          showAllEntities: false,
          showAddButton: true,
          isLoadingAddEntity: false,
        })
        return projectPackagesCopy
      })
    }

    const onSubmitAddEntityHandler = async (
      packageName: string,
      addEntityFormData: AddEntityFormData,
    ): Promise<void> => {
      try {
        toggleIsLoadingAddEntityPackage(packageName)

        const addedEntity = await addEntity(addEntityFormData)

        addEntityToPackage(packageName, addedEntity)

        notifierStore.pushMessage({
          severity: 'success',
          detail: `The entity was added successfully.`,
        })
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while adding the entity: ${error.message}`,
        })
      } finally {
        toggleIsLoadingAddEntityPackage(packageName)
      }
    }

    const toggleIsLoadingAddEntityPackage = (packageName: string): void => {
      setProjectPackages((prevProjectPackages) => {
        const projectPackagesCopy = [...prevProjectPackages]

        const targetedPackage = projectPackagesCopy.find(({ name }) => {
          return name === packageName
        })

        if (!targetedPackage) {
          return prevProjectPackages
        }

        targetedPackage.isLoadingAddEntity = !targetedPackage.isLoadingAddEntity

        return projectPackagesCopy
      })
    }

    const addEntityToPackage = (packageName: string, newEntity: Entity) => {
      setProjectPackages((prevProjectPackages) => {
        const projectPackagesCopy = [...prevProjectPackages]

        const targetedPackage = projectPackagesCopy.find(({ name }) => {
          return name === packageName
        })

        if (!targetedPackage) {
          return prevProjectPackages
        }

        targetedPackage.entities.unshift(newEntity)

        return projectPackagesCopy
      })
    }

    const initialValuesAddPackage: AddPackageFormData = { name: '' }
    const validationSchemaAddPackage = yup.object().shape({
      name: yup
        .mixed()
        .required('Please enter the package name.')
        .notOneOf(
          projectPackages.map(({ name }) => name),
          'A package with this name already exists.',
        ),
    })

    const initialValuesAddEntity: AddEntityFormData = { name: '' }
    const validationSchemaAddEntity = yup.object().shape({
      name: yup.mixed().required('Please enter the entity.'),
    })

    let packagesContent: JSX.Element

    if (isLoadingProject || projectPackages.length === 0) {
      packagesContent = (
        <>
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <Skeleton width='180px' className='mb-2' />
              <Skeleton height='90px' className='mb-4' />
            </React.Fragment>
          ))}
        </>
      )
    } else {
      packagesContent = (
        <>
          <div>
            <div className='mb-4'>
              <h2 className='mb-3'>Add a package</h2>

              <div className='grid grid-nogutter'>
                <div className='col-12 sm:col-6 md:col-12 lg:col-6'>
                  <Formik
                    initialValues={initialValuesAddPackage}
                    validationSchema={validationSchemaAddPackage}
                    onSubmit={({ name }, { resetForm }) => {
                      onSubmitAddPackageHandler(name)
                      resetForm()
                    }}>
                    {(formik) => (
                      <form onSubmit={formik.handleSubmit}>
                        <GenericChipInputText
                          type='text'
                          placeholder='+ Enter new package'
                          className={classNames('w-full', {
                            'p-invalid': isFormikFormFieldInvalid(formik, 'name'),
                          })}
                          {...formik.getFieldProps('name')}
                        />

                        {getFormikFormFieldErrorMessage(formik, 'name')}
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <Divider />
          </div>

          {projectPackages.map((projectPackage) => {
            const packageMenuModel = [
              {
                items: [
                  {
                    label: 'Remove',
                    command: () => {
                      removePackageHandler(projectPackage.name)
                    },
                  },
                ],
              },
            ]

            return (
              <div key={projectPackage.name}>
                <div className='flex align-items-center mb-4'>
                  <h2 className='mr-3'>{projectPackage.name}</h2>
                  <MoreActionsButton menuModel={packageMenuModel} />
                </div>

                <div>
                  {projectPackage.entities
                    .slice(
                      0,
                      projectPackage.showAllEntities
                        ? projectPackage.entities.length
                        : numberOfEntitiesDisplayedPerPackage,
                    )
                    .map((entity) => {
                      return (
                        <GenericChip
                          key={entity.id}
                          label={entity.name}
                          removable
                          className='mr-2 mb-2'
                          onClick={() => {
                            removeEntityFromPackageHandler(projectPackage.name, entity.id)
                          }}
                        />
                      )
                    })}

                  {projectPackage.showAddButton ? (
                    <GenericChipButton
                      label='Add more'
                      icon='pi pi-plus'
                      iconPos='right'
                      className='mr-2 mb-2'
                      onClick={() => {
                        showAddEntityInputHandler(projectPackage.name)
                      }}
                    />
                  ) : (
                    <div className='grid grid-nogutter'>
                      <div className='col-12 sm:col-6 md:col-12 lg:col-6'>
                        <Formik
                          initialValues={initialValuesAddEntity}
                          validationSchema={validationSchemaAddEntity}
                          onSubmit={(values, { resetForm }) => {
                            onSubmitAddEntityHandler(projectPackage.name, values)
                            resetForm()
                          }}>
                          {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                              <GenericChipInputText
                                type='text'
                                placeholder='+ Add keyword, URL, etc.'
                                disabled={projectPackage.isLoadingAddEntity}
                                className={classNames('w-full', {
                                  'p-invalid': isFormikFormFieldInvalid(formik, 'name'),
                                })}
                                {...formik.getFieldProps('name')}
                              />

                              {getFormikFormFieldErrorMessage(formik, 'name')}
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  )}
                </div>

                {projectPackage.entities.length > numberOfEntitiesDisplayedPerPackage ? (
                  <Button
                    label={
                      projectPackage.showAllEntities
                        ? 'Collapse'
                        : `View all ${projectPackage.entities.length} entities`
                    }
                    className='p-button-text p-button-sm mt-2'
                    onClick={() => {
                      toggleShowAllEntitiesHandler(projectPackage.name)
                    }}
                  />
                ) : null}

                <Divider />
              </div>
            )
          })}
        </>
      )
    }

    return (
      <Card>
        {packagesContent}

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
