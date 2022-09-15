import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'common/store/store'
import { amplifyConfirmSignUp } from '../services/onboarding-api.service'

export const OnboardingSignUpConfirm = observer(() => {
  const { notifierStore } = useStore()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search)
        const username = queryParams.get('username')
        const code = queryParams.get('code')
        if (!username || !code) {
          throw new Error('The URL is not valid.')
        }

        await amplifyConfirmSignUp(username, code)

        setIsLoading(false)
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
      {isLoading ? (
        <i className='pi pi-spin pi-spinner text-6xl text-600'></i>
      ) : (
        <i className='pi pi-check-circle text-6xl text-green-500'></i>
      )}
    </div>
  )
})
