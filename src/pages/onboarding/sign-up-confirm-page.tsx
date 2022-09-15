import { Link } from 'react-router-dom'

import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'
import { OnboardingSignUpConfirm } from 'features/onboarding/components/onboarding-sign-up-confirm'

export const SignUpConfirmPage = () => {
  const asideElement = (
    <div className='text-center'>
      <Link to='/sign-in'>Sign In</Link>
    </div>
  )
  return (
    <OnboardingLayout asideElement={asideElement}>
      <h1 className='text-center mb-4'>Account confirmation</h1>

      <OnboardingSignUpConfirm />
    </OnboardingLayout>
  )
}
