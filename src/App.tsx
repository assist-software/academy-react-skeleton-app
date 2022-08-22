import { PageRouter } from 'pages/page-router'

import { LayoutNavigation } from './layout/layout-header/layout-navigation'
import { LayoutFooter } from 'layout/layout-footer/layout-footer'

function App() {
  return (
    <main>
      <LayoutNavigation />

      <PageRouter />

      <LayoutFooter />
    </main>
  )
}

export default App
