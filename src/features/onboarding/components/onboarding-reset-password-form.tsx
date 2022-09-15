import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { amplifyForgotPasswordSubmit } from '../services/onboarding-api.service'
import { useStore } from 'common/store/store'

export const OnboardingResetPasswordForm = observer(() => {
  const { notifierStore } = useStore()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const yupSchema = yup.object().shape({
    password: yup
      .string()
      .required('Please enter your password.')
      .min(8, 'The password must contain at least 8 characters.'),
    confirmPassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: yupSchema,
    onSubmit: async ({ password }) => {
      try {
        setIsLoading(true)

        const queryParams = new URLSearchParams(window.location.search)
        const username = queryParams.get('username')
        const code = queryParams.get('code')
        if (!username || !code) {
          throw new Error('The URL is not valid.')
        }

        await amplifyForgotPasswordSubmit(username, code, password)

        notifierStore.pushMessage({
          severity: 'success',
          detail: `Password reset successfully. You can log in now.`,
        })

        navigate('/sign-in')
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while resetting the password: ${error.message}`,
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
        <label htmlFor='password' className='block mb-2'>
          Password *
        </label>

        <InputText
          type='password'
          value={formik.values.password}
          placeholder='Enter your new password'
          id='password'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('password') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('password')}
      </div>

      <div className='field mb-4'>
        <label htmlFor='confirmPassword' className='block mb-2'>
          Confirm password *
        </label>

        <InputText
          type='password'
          value={formik.values.confirmPassword}
          placeholder='Retype your password'
          id='confirmPassword'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('confirmPassword') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('confirmPassword')}
      </div>

      <Button
        type='submit'
        label='Reset password'
        iconPos='right'
        loading={isLoading}
        className='w-full mt-4'
      />
    </form>
  )
})
