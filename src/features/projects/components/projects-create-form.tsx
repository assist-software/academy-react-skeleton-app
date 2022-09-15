import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { useStore } from 'common/store/store'
import { GenericSelectButton } from 'common/components/generic-select-button'
import { marketProblemSelectItems } from '../constants/projects.const'

export const ProjectsCreateForm = observer(() => {
  const { notifierStore } = useStore()
  const { projectsStore } = useStore()

  const { addProject } = projectsStore

  const [isLoadingAddProject, setIsLoadingAddProject] = useState(false)

  const navigate = useNavigate()

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
        setIsLoadingAddProject(true)

        const { id } = await addProject({ name, marketProblem, objective })

        notifierStore.pushMessage({
          severity: 'success',
          detail: `The project was added successfully.`,
        })

        navigate(`/update-project-step-2/${id}`)
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while adding the project: ${error.message}`,
        })
      } finally {
        setIsLoadingAddProject(false)
      }
    },
  })

  const isFormFieldValid = (name: string): boolean =>
    !!((formik.touched as any)[name] && (formik.errors as any)[name])
  const getFormFieldErrorMessage = (name: string) =>
    isFormFieldValid(name) && <small className='p-error'>{(formik.errors as any)[name]}</small>

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <div className='field mb-6'>
          <label htmlFor='name' className='block mb-2'>
            Name your project
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
            What type of market problem?
          </label>

          <GenericSelectButton
            value={formik.values.marketProblem}
            options={marketProblemSelectItems}
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
            What’s your objective?
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

      <div className='flex justify-content-between align-items-baseline mt-5'>
        <Link to='/projects' className='text-600'>
          &#60; Back to projects list
        </Link>

        <Button
          type='submit'
          label='Create new project'
          iconPos='right'
          loading={isLoadingAddProject}
        />
      </div>
    </form>
  )
})
