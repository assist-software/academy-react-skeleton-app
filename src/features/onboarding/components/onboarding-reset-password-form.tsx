import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Formik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import {
  getFormikFormFieldErrorMessage,
  isFormikFormFieldInvalid,
} from 'common/services/utils.service'
import { useStore } from 'common/store/store'
import { ResetPasswordFormData } from '../types/onboarding-forms.types'

export const OnboardingResetPasswordForm = observer(() => {
  const { notifierStore, onboardingStore } = useStore()
  const { forgotPasswordSubmit, wipForgotPasswordSubmit } = onboardingStore

  const navigate = useNavigate()

  const onSubmitHandler = async ({ password }: ResetPasswordFormData): Promise<void> => {
    try {
      const queryParams = new URLSearchParams(window.location.search)
      const username = queryParams.get('username')
      const code = queryParams.get('code')
      if (!username || !code) {
        throw new Error('The URL is not valid.')
      }

      await forgotPasswordSubmit(username, code, password)

      notifierStore.pushMessage({
        severity: 'success',
        detail: `Password reset successfully. You can log in now.`,
      })

      navigate('/sign-in')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while resetting the password: ${errorMessage}`,
      })
    }
  }

  const initialValues: ResetPasswordFormData = {
    password: '',
    confirmPassword: '',
  }
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Please enter your password.')
      .min(8, 'The password must contain at least 8 characters.'),
    confirmPassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
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
          <div className='field mb-4'>
            <label htmlFor='password' className='block mb-2'>
              Password *
            </label>

            <InputText
              type='password'
              placeholder='Enter your new password'
              id='password'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'password'),
              })}
              {...formik.getFieldProps('password')}
            />

            {getFormikFormFieldErrorMessage(formik, 'password')}
          </div>

          <div className='field mb-4'>
            <label htmlFor='confirmPassword' className='block mb-2'>
              Confirm password *
            </label>

            <InputText
              type='password'
              placeholder='Retype your password'
              id='confirmPassword'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'confirmPassword'),
              })}
              {...formik.getFieldProps('confirmPassword')}
            />

            {getFormikFormFieldErrorMessage(formik, 'confirmPassword')}
          </div>

          <Button
            type='submit'
            label='Reset password'
            iconPos='right'
            loading={wipForgotPasswordSubmit}
            className='w-full mt-4'
          />
        </form>
      )}
    </Formik>
  )
})
