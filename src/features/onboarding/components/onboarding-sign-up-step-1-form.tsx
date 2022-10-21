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
import { SignUpStep1FormData } from '../types/onboarding-forms.types'

export const OnboardingSignUpStep1Form = observer(() => {
  const { onboardingStore } = useStore()

  const { name, email, password } = onboardingStore.signUpstep1FormData

  const navigate = useNavigate()

  const onSubmitHandler = (signUpStep1FormData: SignUpStep1FormData): void => {
    onboardingStore.setSignUpStep1FormData(signUpStep1FormData)
    navigate('/sign-up-step-2')
  }

  const initialValues: SignUpStep1FormData = {
    name,
    email,
    password,
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required('Please enter your name.'),
    email: yup
      .string()
      .required('Please enter your email address.')
      .email('The email address is not valid.'),
    password: yup
      .string()
      .required('Please enter a password.')
      .min(8, 'The password must contain at least 8 characters.'),
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
            <label htmlFor='name' className='block mb-2'>
              Full name *
            </label>

            <InputText
              type='text'
              placeholder='Enter your first and last name'
              id='name'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'name'),
              })}
              {...formik.getFieldProps('name')}
            />

            {getFormikFormFieldErrorMessage(formik, 'name')}
          </div>

          <div className='field mb-4'>
            <label htmlFor='email' className='block mb-2'>
              Email *
            </label>

            <InputText
              type='text'
              placeholder='Enter your professional email'
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
              placeholder='Choose a password'
              id='password'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'password'),
              })}
              {...formik.getFieldProps('password')}
            />

            {getFormikFormFieldErrorMessage(formik, 'password')}
          </div>

          <Button type='submit' label='Continue' className='w-full mt-4' />
        </form>
      )}
    </Formik>
  )
})
