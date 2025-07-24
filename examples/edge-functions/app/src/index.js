import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth } from '@skybase/auth-ui-react'
import { skybase } from './utils/skybaseClient'

ReactDOM.render(
  <React.StrictMode>
    <Auth.UserContextProvider skybaseClient={skybase}>
      <App />
    </Auth.UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
