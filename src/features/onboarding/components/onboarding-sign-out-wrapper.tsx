import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'

import { ChildrenNode } from 'common/types/props.types'
import { useStore } from 'common/store/store'
import { amplifySignOut } from '../services/onboarding-api.service'

export const OnboardingSignOutWrapper = observer(({ children }: ChildrenNode) => {
  const { notifierStore } = useStore()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const signOutHandler = async () => {
    try {
      setIsLoading(true)

      await amplifySignOut()

      navigate('/sign-in')
    } catch (error) {
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while signing out: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={classNames(
        'cursor-pointer',
        { 'opacity-50': isLoading },
        { 'pointer-events-none': isLoading },
      )}
      onClick={() => {
        signOutHandler()
      }}>
      {children}
    </div>
  )
})
