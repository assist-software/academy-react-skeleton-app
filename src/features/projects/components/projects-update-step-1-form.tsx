import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import {
  getFormikFormFieldErrorMessage,
  isFormikFormFieldInvalid,
} from 'common/services/utils.service'
import { useStore } from 'common/store/store'
import { GenericSelectButton } from 'common/components/generic-select-button'
import { marketProblemSelectItems } from '../constants/projects.const'
import { ProjectStep1FormData } from '../types/projects-forms.types'

interface ProjectsUpdateStep1FormProps {
  id: number
}

export const ProjectsUpdateStep1Form = observer(
  ({ id: targetedProjectId }: ProjectsUpdateStep1FormProps) => {
    const { notifierStore, projectsStore } = useStore()
    const { modifyProject, project, wipLoadProject, wipModifyProject } = projectsStore

    const navigate = useNavigate()

    useEffect(() => {
      ;(async () => {
        try {
          if (!project || project.id !== targetedProjectId) {
            await projectsStore.loadProject(targetedProjectId)
          }
        } catch (error) {
          const errorMessage = error?.response?.data?.message || error.message
          notifierStore.pushMessage({
            severity: 'error',
            detail: `An error occurred while loading the project: ${errorMessage}`,
          })
        }
      })()
    }, [])

    const onSubmitHandler = async (projectStep1FormData: ProjectStep1FormData): Promise<void> => {
      try {
        await modifyProject(targetedProjectId, projectStep1FormData)

        notifierStore.pushMessage({
          severity: 'success',
          detail: `The project was updated successfully.`,
        })

        navigate(`/update-project-step-2/${targetedProjectId}`)
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while updating the project: ${errorMessage}`,
        })
      }
    }

    const initialValues: ProjectStep1FormData = {
      name: project?.name || '',
      marketProblem: project?.marketProblem || '',
      objective: project?.objective || '',
    }
    const validationSchema = yup.object().shape({
      name: yup.string().required('Please enter the name of the project.'),
      marketProblem: yup
        .string()
        .required('Please select the market problem you are interested in.')
        .nullable(),
      objective: yup.string().required('Please enter your objective.'),
    })

    let formContent: JSX.Element

    if (wipLoadProject || project === null) {
      formContent = (
        <Card>
          <Skeleton height='90px' className='mb-4' />
          <Skeleton height='180px' className='mb-4' />
          <Skeleton height='90px' />
        </Card>
      )
    } else {
      formContent = (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmitHandler(values)
          }}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Card>
                <div className='field mb-6'>
                  <label htmlFor='name' className='block mb-2'>
                    Name
                  </label>

                  <InputText
                    type='text'
                    id='name'
                    className={classNames('w-full', {
                      'p-invalid': isFormikFormFieldInvalid(formik, 'name'),
                    })}
                    {...formik.getFieldProps('name')}
                  />

                  {getFormikFormFieldErrorMessage(formik, 'name')}
                </div>

                <div className='field mb-6'>
                  <label htmlFor='marketProblem' className='block mb-2'>
                    Market problem
                  </label>

                  <GenericSelectButton
                    options={marketProblemSelectItems}
                    disabled
                    itemTemplate={({ icon, label }) => (
                      <div className='w-full flex flex-column'>
                        <i className={classNames(icon, 'text-lg', 'mb-2')}></i>
                        <span>{label}</span>
                      </div>
                    )}
                    id='marketProblem'
                    className={classNames({
                      'p-invalid': isFormikFormFieldInvalid(formik, 'marketProblem'),
                    })}
                    {...formik.getFieldProps('marketProblem')}
                  />

                  {getFormikFormFieldErrorMessage(formik, 'marketProblem')}
                </div>

                <div className='field'>
                  <label htmlFor='objective' className='block mb-2'>
                    Objective
                  </label>

                  <InputText
                    type='text'
                    id='objective'
                    className={classNames('w-full', {
                      'p-invalid': isFormikFormFieldInvalid(formik, 'objective'),
                    })}
                    {...formik.getFieldProps('objective')}
                  />

                  {getFormikFormFieldErrorMessage(formik, 'objective')}
                </div>
              </Card>

              <div className='flex justify-content-between align-items-center mt-5'>
                <Link to='/projects' className='text-600'>
                  &#60; Back to projects list
                </Link>

                <Button type='submit' label='Update' iconPos='right' loading={wipModifyProject} />
              </div>
            </form>
          )}
        </Formik>
      )
    }

    return formContent
  },
)
