import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { useStore } from 'common/store/store'
import { NoDataFound } from 'common/components/no-data-found'
import { GenericSelectButton } from 'common/components/generic-select-button'
import { marketProblemSelectItems } from '../constants/projects.const'

interface ProjectsUpdateStep1FormProps {
  id: string
}

export const ProjectsUpdateStep1Form = observer(
  ({ id: targetedProjectId }: ProjectsUpdateStep1FormProps) => {
    const { notifierStore } = useStore()
    const { projectsStore } = useStore()

    const { modifyProject, project } = projectsStore

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
        const { name, marketProblem, objective } = project
        formik.setValues({
          name,
          marketProblem,
          objective,
        })
      }
    }, [project])

    const yupSchema = yup.object().shape({
      name: yup.string().required('Please enter the name of the project.'),
      marketProblem: yup
        .string()
        .required('Please select the market problem you are interested in.')
        .nullable(),
      objective: yup.string().required('Please enter your objective.'),
    })

    const formik = useFormik({
      initialValues: {
        name: '',
        marketProblem: '',
        objective: '',
      },
      validationSchema: yupSchema,
      onSubmit: async ({ name, marketProblem, objective }) => {
        try {
          setIsLoadingModifyProject(true)

          await modifyProject(targetedProjectId, { name, marketProblem, objective })

          notifierStore.pushMessage({
            severity: 'success',
            detail: `The project was updated successfully.`,
          })

          navigate(`/update-project-step-2/${targetedProjectId}`)
        } catch (error) {
          notifierStore.pushMessage({
            severity: 'error',
            detail: `An error occurred while updating the project: ${error.message}`,
          })
        } finally {
          setIsLoadingModifyProject(false)
        }
      },
    })

    const isFormFieldValid = (name: string): boolean =>
      !!((formik.touched as any)[name] && (formik.errors as any)[name])
    const getFormFieldErrorMessage = (name: string) =>
      isFormFieldValid(name) && <small className='p-error'>{(formik.errors as any)[name]}</small>

    let formContent: JSX.Element

    if (isLoadingProject) {
      formContent = (
        <Card>
          <Skeleton height='90px' className='mb-4' />
          <Skeleton height='180px' className='mb-4' />
          <Skeleton height='90px' />
        </Card>
      )
    } else if (project === null) {
      formContent = <NoDataFound useCardWrapper={true}>Project data not found</NoDataFound>
    } else {
      formContent = (
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <div className='field mb-6'>
              <label htmlFor='name' className='block mb-2'>
                Name
              </label>

              <InputText
                type='text'
                value={formik.values.name}
                id='name'
                className={classNames('w-full', { 'p-invalid': isFormFieldValid('name') })}
                onChange={formik.handleChange}
              />

              {getFormFieldErrorMessage('name')}
            </div>

            <div className='field mb-6'>
              <label htmlFor='marketProblem' className='block mb-2'>
                Market problem
              </label>

              <GenericSelectButton
                value={formik.values.marketProblem}
                options={marketProblemSelectItems}
                disabled
                itemTemplate={({ icon, label }) => (
                  <div className='w-full flex flex-column'>
                    <i className={classNames(icon, 'text-lg', 'mb-2')}></i>
                    <span>{label}</span>
                  </div>
                )}
                id='marketProblem'
                className={classNames({ 'p-invalid': isFormFieldValid('marketProblem') })}
                onChange={formik.handleChange}
              />

              {getFormFieldErrorMessage('marketProblem')}
            </div>

            <div className='field'>
              <label htmlFor='objective' className='block mb-2'>
                Objective
              </label>

              <InputText
                type='text'
                value={formik.values.objective}
                id='objective'
                className={classNames('w-full', { 'p-invalid': isFormFieldValid('objective') })}
                onChange={formik.handleChange}
              />

              {getFormFieldErrorMessage('objective')}
            </div>
          </Card>

          <div className='flex justify-content-between align-items-center mt-5'>
            <Link to='/projects' className='text-600'>
              &#60; Back to projects list
            </Link>

            <Button type='submit' label='Update' iconPos='right' loading={isLoadingModifyProject} />
          </div>
        </form>
      )
    }

    return formContent
  },
)
