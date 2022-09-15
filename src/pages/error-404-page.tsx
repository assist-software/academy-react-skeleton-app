import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAuthenticatedUserRole } from 'common/services/auth.service'
import { Roles } from 'router/constants/roles.const'
import { OnboardingLayout } from 'common/components/layouts/onboarding-layout'

export const Error404Page = () => {
  const navigate = useNavigate()

  useEffect(() => {
    switch (getAuthenticatedUserRole()) {
      case Roles.Public:
        navigate('/sign-in')
        break

      case Roles.Admin:
        const onboardingPaths = [
          '/sign-up-step-1',
          '/sign-up-step-2',
          '/sign-up-confirm',
          '/sign-in',
          '/forgot-password',
          '/reset-password',
        ]
        if (onboardingPaths.includes(window.location.pathname)) {
          navigate('/projects')
        }
        break
    }
  }, [])

  return (
    <OnboardingLayout>
      <div className='text-center'>
        <h1 className='mb-4'>Error 404</h1>
        <p>Page Not Found</p>
      </div>
    </OnboardingLayout>
  )
}
