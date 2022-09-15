import { Link } from 'react-router-dom'

import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'
import { OnboardingForgotPasswordForm } from 'features/onboarding/components/onboarding-forgot-password-form'

export const ForgotPasswordPage = () => {
  const asideElement = (
    <div className='text-center'>
      Don't have an account yet? <Link to='/sign-in'>Sign In</Link>
    </div>
  )

  return (
    <OnboardingLayout asideElement={asideElement}>
      <h1 className='text-center mb-4'>Forgot password?</h1>

      <p className='mb-4'>
        Start the process of resetting your password by providing your registered email.
      </p>

      <OnboardingForgotPasswordForm />
    </OnboardingLayout>
  )
}
