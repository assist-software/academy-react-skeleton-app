import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

import { industries } from '../constants/onboarding.const'
import { SignUpFormsData } from '../types/onboarding-forms.types'
import { amplifySignUp } from '../services/onboarding-api.service'
import { useStore } from 'common/store/store'

export const OnboardingSignUpStep2Form = observer(() => {
  const { notifierStore } = useStore()
  const { onboardingStore } = useStore()

  const { name, email, password } = onboardingStore.signUpstep1FormData
  const { company, role, industry, phone } = onboardingStore.signUpstep2FormData

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (name === '' || email === '' || password === '') {
      navigate('/sign-up-step-1')
    }
  }, [])

  const yupSchema = yup.object().shape({
    company: yup.string().required('Please enter your company name.'),
    role: yup.string().required('Please enter your job title or role.'),
    industry: yup.string().required('Please select an industry.'),
    phone: yup.string().required('Please enter your phone number.'),
  })

  const formik = useFormik({
    initialValues: {
      company,
      role,
      industry,
      phone,
    },
    validationSchema: yupSchema,
    onSubmit: ({ company, role, industry, phone }) => {
      onboardingStore.setSignUpStep2FormData({ company, role, industry, phone })

      createAccount({
        name,
        email,
        password,
        company,
        role,
        industry,
        phone,
      })
    },
  })

  const isFormFieldValid = (name: string): boolean =>
    !!((formik.touched as any)[name] && (formik.errors as any)[name])
  const getFormFieldErrorMessage = (name: string) =>
    isFormFieldValid(name) && <small className='p-error'>{(formik.errors as any)[name]}</small>

  const skipAndCreateAccountHandler = () => {
    createAccount({
      name,
      email,
      password,
      company: '',
      role: '',
      industry: '',
      phone: '',
    })
  }

  const createAccount = async (userData: SignUpFormsData) => {
    try {
      setIsLoading(true)

      await amplifySignUp(userData)

      onboardingStore.resetFormsData()

      notifierStore.pushMessage({
        severity: 'success',
        detail: `The account was created successfully. Before you can sign in, you must confirm your account. To do this, access the link received in the email.`,
      })

      navigate('/sign-in')
    } catch (error) {
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while creating the account: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='field mb-4'>
        <label htmlFor='company' className='block mb-2'>
          Company
        </label>

        <InputText
          type='text'
          value={formik.values.company}
          placeholder='Enter your company name'
          id='company'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('company') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('company')}
      </div>

      <div className='field mb-4'>
        <label htmlFor='role' className='block mb-2'>
          Title/role
        </label>

        <InputText
          type='text'
          value={formik.values.role}
          placeholder='Enter your job title or role'
          id='role'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('role') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('role')}
      </div>

      <div className='field mb-4'>
        <label htmlFor='industry' className='block mb-2'>
          Industry
        </label>

        <Dropdown
          options={industries}
          optionLabel='label'
          value={formik.values.industry}
          placeholder='Select an industry'
          id='industry'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('industry') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('industry')}
      </div>

      <div className='field mb-4'>
        <label htmlFor='phone' className='block mb-2'>
          Phone number
        </label>

        <InputText
          type='text'
          value={formik.values.phone}
          placeholder='Enter your 10-digit phone number'
          id='phone'
          className={classNames('w-full', { 'p-invalid': isFormFieldValid('phone') })}
          onChange={formik.handleChange}
        />

        {getFormFieldErrorMessage('phone')}
      </div>

      <Button
        type='submit'
        label='Create account'
        iconPos='right'
        loading={isLoading}
        className='w-full mt-4'
      />
      <Button
        type='button'
        label='Skip for now'
        iconPos='right'
        loading={isLoading}
        className='p-button-outlined w-full mt-4'
        onClick={() => {
          skipAndCreateAccountHandler()
        }}
      />
    </form>
  )
})
