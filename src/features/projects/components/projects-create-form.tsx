import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Card } from 'primereact/card'
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

export const ProjectsCreateForm = observer(() => {
  const { notifierStore, projectsStore } = useStore()
  const { addProject, wipAddProject } = projectsStore

  const navigate = useNavigate()

  const onSubmitHandler = async (projectStep1FormData: ProjectStep1FormData): Promise<void> => {
    try {
      const { id } = await addProject(projectStep1FormData)

      notifierStore.pushMessage({
        severity: 'success',
        detail: `The project was added successfully.`,
      })

      navigate(`/update-project-step-2/${id}`)
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while adding the project: ${errorMessage}`,
      })
    }
  }

  const initialValues: ProjectStep1FormData = {
    name: '',
    marketProblem: '',
    objective: '',
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required('Please enter the name of the project.'),
    marketProblem: yup
      .string()
      .required('Please select the market problem you are interested in.')
      .nullable(),
    objective: yup.string().required('Please enter your objective.'),
  })

  return (
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
                Name your project
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
                What type of market problem?
              </label>

              <GenericSelectButton
                options={marketProblemSelectItems}
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
                What’s your objective?
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

          <div className='flex justify-content-between align-items-baseline mt-5'>
            <Link to='/projects' className='text-600'>
              &#60; Back to projects list
            </Link>

            <Button
              type='submit'
              label='Create new project'
              iconPos='right'
              loading={wipAddProject}
            />
          </div>
        </form>
      )}
    </Formik>
  )
})
