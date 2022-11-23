import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'

import { ChildrenNode } from 'common/types/props.types'
import { useStore } from 'common/store/store'

export const OnboardingSignOutWrapper = observer(({ children }: ChildrenNode) => {
  const { notifierStore, onboardingStore } = useStore()
  const { signOut, wipSignOut } = onboardingStore

  const navigate = useNavigate()

  const signOutHandler = async () => {
    try {
      await signOut()

      navigate('/sign-in')
    } catch (error) {
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while signing out: ${error.message}`,
      })
    }
  }

  return (
    <div
      className={classNames(
        'cursor-pointer',
        { 'opacity-50': wipSignOut },
        { 'pointer-events-none': wipSignOut },
      )}
      onClick={() => {
        signOutHandler()
      }}>
      {children}
    </div>
  )
})
