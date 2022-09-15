import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import 'primeflex/primeflex.min.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'

import { configureAmplify } from 'common/services/auth.service'
import { setInterceptorsTo } from 'common/services/interceptors.service'
import { App } from './app'
import reportWebVitals from './report-web-vitals'
import 'assets/styles/variables.scss'
import 'assets/styles/theme-overwrite.scss'
import 'assets/styles/components.scss'

configureAmplify()

setInterceptorsTo(axios)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
