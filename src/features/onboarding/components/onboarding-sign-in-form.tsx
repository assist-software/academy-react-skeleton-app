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
import { SignInFormData } from '../types/onboarding-forms.types'

export const OnboardingSignInForm = observer(() => {
  const { notifierStore, onboardingStore } = useStore()
  const { signIn, wipSignIn } = onboardingStore

  const navigate = useNavigate()

  const onSubmitHandler = async (signInFormData: SignInFormData): Promise<void> => {
    try {
      await signIn(signInFormData)

      navigate('/projects')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while signing in: ${errorMessage}`,
      })
    }
  }

  const initialValues: SignInFormData = {
    email: '',
    password: '',
  }
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email address.')
      .email('The email address is not valid.'),
    password: yup.string().required('Please enter your password.'),
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
              placeholder='Enter your email'
              id='email'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'email'),
              })}
              {...formik.getFieldProps('email')}
            />

            {getFormikFormFieldErrorMessage(formik, 'email')}
          </div>

          <div className='field mb-4'>
            <label htmlFor='password' className='block mb-2'>
              Password *
            </label>

            <InputText
              type='password'
              placeholder='Enter your password'
              id='password'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'password'),
              })}
              {...formik.getFieldProps('password')}
            />

            {getFormikFormFieldErrorMessage(formik, 'password')}
          </div>

          <Button
            type='submit'
            label='Sign in'
            iconPos='right'
            loading={wipSignIn}
            className='w-full mt-4'
          />
        </form>
      )}
    </Formik>
  )
})
