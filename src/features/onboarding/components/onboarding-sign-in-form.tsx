import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { amplifySignIn } from '../services/onboarding-api.service'
import { useStore } from 'common/store/store'

export const OnboardingSignInForm = observer(() => {
  const { notifierStore } = useStore()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const yupSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email address.')
      .email('The email address is not valid.'),
    password: yup.string().required('Please enter your password.'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yupSchema,
    onSubmit: async ({ email, password }) => {
      try {
        setIsLoading(true)

        await amplifySignIn({ email, password })

        navigate('/projects')
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while signing in: ${error.message}`,
        })
      } finally {
        setIsLoading(false)
      }
    },
  })

  const isFormFieldValid = (name: string): boolean =>
    !!((formik.touched as any)[name] && (formik.errors as any)[name])
  const getFormFieldErrorMessage = (name: string) =>
    isFormFieldValid(name) && <small className='p-error'>{(formik.errors as any)[name]}</small>

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='field mb-4'>
        <label htmlFor='email' className='block mb-2'>
          Email *
        </label>

        <InputText
          type='text'
          value={formik.values.email}
          placeholder='Enter your email'
          id='email'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('email') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('email')}
      </div>

      <div className='field mb-4'>
        <label htmlFor='password' className='block mb-2'>
          Password *
        </label>

        <InputText
          type='password'
          value={formik.values.password}
          placeholder='Enter your password'
          id='password'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('password') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('password')}
      </div>

      <Button
        type='submit'
        label='Sign in'
        iconPos='right'
        loading={isLoading}
        className='w-full mt-4'
      />
    </form>
  )
})
