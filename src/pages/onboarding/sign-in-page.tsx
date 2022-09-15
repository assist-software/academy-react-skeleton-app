import { Link } from 'react-router-dom'

import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'
import { OnboardingSignInForm } from 'features/onboarding/components/onboarding-sign-in-form'

export const SignInPage = () => {
  const asideElement = (
    <div className='flex justify-content-between'>
      <Link to='/forgot-password'>Forgot password?</Link>
      <Link to='/sign-up-step-1'>Create new account</Link>
    </div>
  )

  return (
    <OnboardingLayout asideElement={asideElement}>
      <h1 className='text-center mb-4'>Sign in</h1>

      <OnboardingSignInForm />
    </OnboardingLayout>
  )
}
