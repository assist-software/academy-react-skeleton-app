import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Formik } from 'formik'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

import { industries } from '../constants/onboarding.const'
import { SignUpFormsData, SignUpStep2FormData } from '../types/onboarding-forms.types'
import {
  getFormikFormFieldErrorMessage,
  isFormikFormFieldInvalid,
} from 'common/services/utils.service'
import { useStore } from 'common/store/store'

export const OnboardingSignUpStep2Form = observer(() => {
  const { notifierStore, onboardingStore } = useStore()
  const { signUp, wipSignUp } = onboardingStore
  const { name, email, password } = onboardingStore.signUpstep1FormData
  const { company, role, industry, phone } = onboardingStore.signUpstep2FormData

  const navigate = useNavigate()

  useEffect(() => {
    if (name === '' || email === '' || password === '') {
      navigate('/sign-up-step-1')
    }
  }, [])

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
      await signUp(userData)

      onboardingStore.resetFormsData()

      notifierStore.pushMessage({
        severity: 'success',
        detail: `The account was created successfully. Before you can sign in, you must confirm your account. To do this, access the link received in the email.`,
      })

      navigate('/sign-in')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while creating the account: ${errorMessage}`,
      })
    }
  }

  const onSubmitHandler = (signUpStep2FormData: SignUpStep2FormData): void => {
    onboardingStore.setSignUpStep2FormData(signUpStep2FormData)

    createAccount({
      name,
      email,
      password,
      ...signUpStep2FormData,
    })
  }

  const initialValues: SignUpStep2FormData = {
    company,
    role,
    industry,
    phone,
  }
  const validationSchema = yup.object().shape({
    company: yup.string().required('Please enter your company name.'),
    role: yup.string().required('Please enter your job title or role.'),
    industry: yup.string().required('Please select an industry.'),
    phone: yup.string().required('Please enter your phone number.'),
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
            <label htmlFor='company' className='block mb-2'>
              Company
            </label>

            <InputText
              type='text'
              placeholder='Enter your company name'
              id='company'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'company'),
              })}
              {...formik.getFieldProps('company')}
            />

            {getFormikFormFieldErrorMessage(formik, 'company')}
          </div>

          <div className='field mb-4'>
            <label htmlFor='role' className='block mb-2'>
              Title/role
            </label>

            <InputText
              type='text'
              placeholder='Enter your job title or role'
              id='role'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'role'),
              })}
              {...formik.getFieldProps('role')}
            />

            {getFormikFormFieldErrorMessage(formik, 'role')}
          </div>

          <div className='field mb-4'>
            <label htmlFor='industry' className='block mb-2'>
              Industry
            </label>

            <Dropdown
              options={industries}
              optionLabel='label'
              placeholder='Select an industry'
              id='industry'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'industry'),
              })}
              {...formik.getFieldProps('industry')}
            />

            {getFormikFormFieldErrorMessage(formik, 'industry')}
          </div>

          <div className='field mb-4'>
            <label htmlFor='phone' className='block mb-2'>
              Phone number
            </label>

            <InputText
              type='text'
              placeholder='Enter your 10-digit phone number'
              id='phone'
              className={classNames('w-full', {
                'p-invalid': isFormikFormFieldInvalid(formik, 'phone'),
              })}
              {...formik.getFieldProps('phone')}
            />

            {getFormikFormFieldErrorMessage(formik, 'phone')}
          </div>

          <Button
            type='submit'
            label='Create account'
            iconPos='right'
            loading={wipSignUp}
            className='w-full mt-4'
          />
          <Button
            type='button'
            label='Skip for now'
            iconPos='right'
            loading={wipSignUp}
            className='p-button-outlined w-full mt-4'
            onClick={() => {
              skipAndCreateAccountHandler()
            }}
          />
        </form>
      )}
    </Formik>
  )
})
