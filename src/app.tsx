import { GlobalStyles } from './assets/styles/global-styles'
import { Notifier } from 'features/notifier/components/Notifier'
import { Router } from 'router/router'

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Notifier />
      <Router />
    </>
  )
}
