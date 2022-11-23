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
import { ForgotPasswordFormData } from '../types/onboarding-forms.types'

export const OnboardingForgotPasswordForm = observer(() => {
  const { notifierStore, onboardingStore } = useStore()
  const { forgotPassword, wipForgotPassword } = onboardingStore

  const onSubmitHandler = async ({ email }: ForgotPasswordFormData): Promise<void> => {
    try {
      await forgotPassword(email)

      notifierStore.pushMessage({
        severity: 'success',
        detail: `An email has been sent to the address you entered. Please access the link in the email to reset your password.`,
      })
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred: ${errorMessage}`,
      })
    }
  }

  const initialValues: ForgotPasswordFormData = {
    email: '',
  }
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email address.')
      .email('The email address is not valid.'),
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
            <label htmlFor='email' className='block mb-2'>
              Email *
            </label>

            <InputText
              type='text'
              placeholder='Enter your registered email'
              id='email'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'email'),
              })}
              {...formik.getFieldProps('email')}
            />

            {getFormikFormFieldErrorMessage(formik, 'email')}
          </div>

          <Button
            type='submit'
            label='Send email'
            iconPos='right'
            loading={wipForgotPassword}
            className='w-full mt-4'
          />
        </form>
      )}
    </Formik>
  )
})
