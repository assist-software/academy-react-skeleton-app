import { Link } from 'react-router-dom'

import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'
import { OnboardingSignUpStep1Form } from 'features/onboarding/components/onboarding-sign-up-step-1-form'

export const SignUpStep1Page = () => {
  const asideElement = (
    <div className='text-center'>
      Already have an account? <Link to='/sign-in'>Sign In</Link>
    </div>
  )

  return (
    <OnboardingLayout asideElement={asideElement}>
      <h1 className='text-center mb-4'>Create account</h1>

      <OnboardingSignUpStep1Form />
    </OnboardingLayout>
  )
}
