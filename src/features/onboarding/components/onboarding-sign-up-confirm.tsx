import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'common/store/store'

export const OnboardingSignUpConfirm = observer(() => {
  const { notifierStore, onboardingStore } = useStore()
  const { confirmSignUp, wipConfirmSignUp } = onboardingStore

  useEffect(() => {
    ;(async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search)
        const username = queryParams.get('username')
        const code = queryParams.get('code')
        if (!username || !code) {
          throw new Error('The URL is not valid.')
        }

        await confirmSignUp(username, code)
      } catch (error) {
        notifierStore.pushMessage({
          severity: 'error',
          detail: `An error occurred while confirming the account: ${error.message}`,
        })
      }
    })()
  }, [])

  return (
    <div className='text-center mt-6'>
      {wipConfirmSignUp ? (
        <i className='pi pi-spin pi-spinner text-6xl text-600'></i>
      ) : (
        <i className='pi pi-check-circle text-6xl text-green-500'></i>
      )}
    </div>
  )
})
