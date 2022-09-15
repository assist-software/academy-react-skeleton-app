import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { amplifyForgotPassword } from '../services/onboarding-api.service'
import { useStore } from 'common/store/store'

export const OnboardingForgotPasswordForm = observer(() => {
  const { notifierStore } = useStore()

  const [isLoading, setIsLoading] = useState(false)

  const yupSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email address.')
      .email('The email address is not valid.'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yupSchema,
    onSubmit: async ({ email }) => {
      try {
        setIsLoading(true)

        await amplifyForgotPassword(email)

        notifierStore.pushMessage({
          severity: 'success',
          detail: `An email has been sent to the address you entered. Please access the link in the email to reset your password.`,
        })
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred: ${error.message}`,
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
          placeholder='Enter your registered email'
          id='email'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('email') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('email')}
      </div>

      <Button
        type='submit'
        label='Send email'
        iconPos='right'
        loading={isLoading}
        className='w-full mt-4'
      />
    </form>
  )
})
