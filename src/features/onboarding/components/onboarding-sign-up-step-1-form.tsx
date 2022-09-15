import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { useStore } from 'common/store/store'

export const OnboardingSignUpStep1Form = observer(() => {
  const { onboardingStore } = useStore()

  const { name, email, password } = onboardingStore.signUpstep1FormData

  const navigate = useNavigate()

  const yupSchema = yup.object().shape({
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

  const formik = useFormik({
    initialValues: {
      name,
      email,
      password,
    },
    validationSchema: yupSchema,
    onSubmit: ({ name, email, password }) => {
      onboardingStore.setSignUpStep1FormData({ name, email, password })
      navigate('/sign-up-step-2')
    },
  })

  const isFormFieldValid = (name: string): boolean =>
    !!((formik.touched as any)[name] && (formik.errors as any)[name])
  const getFormFieldErrorMessage = (name: string) =>
    isFormFieldValid(name) && <small className='p-error'>{(formik.errors as any)[name]}</small>

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='field mb-4'>
        <label htmlFor='name' className='block mb-2'>
          Full name *
        </label>

        <InputText
          type='text'
          value={formik.values.name}
          placeholder='Enter your first and last name'
          id='name'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('name') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('name')}
      </div>

      <div className='field mb-4'>
        <label htmlFor='email' className='block mb-2'>
          Email *
        </label>

        <InputText
          type='text'
          value={formik.values.email}
          placeholder='Enter your professional email'
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
          placeholder='Choose a password'
          id='password'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('password') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('password')}
      </div>

      <Button type='submit' label='Continue' className='w-full mt-4' />
    </form>
  )
})
