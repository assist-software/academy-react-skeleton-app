import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'
import { OnboardingResetPasswordForm } from 'features/onboarding/components/onboarding-reset-password-form'

export const ResetPasswordPage = () => {
  return (
    <OnboardingLayout>
      <h1 className='text-center mb-4'>Reset password</h1>

      <OnboardingResetPasswordForm />
    </OnboardingLayout>
  )
}
