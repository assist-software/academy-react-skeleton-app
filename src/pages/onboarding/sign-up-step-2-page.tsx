import { Link } from 'react-router-dom'

import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'
import { OnboardingSignUpStep2Form } from 'features/onboarding/components/onboarding-sign-up-step-2-form'

export const SignUpStep2Page = () => {
  const asideElement = (
    <div className='text-center'>
      Already have an account? <Link to='/sign-in'>Sign In</Link>
    </div>
  )

  return (
    <OnboardingLayout asideElement={asideElement}>
      <h1 className='text-center mb-4'>More about you</h1>

      <p className='mb-4'>
        When you add this optional information, it helps us understand your goals and deliver better
        results
      </p>

      <OnboardingSignUpStep2Form />
    </OnboardingLayout>
  )
}
