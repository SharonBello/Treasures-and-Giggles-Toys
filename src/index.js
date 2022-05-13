import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App } from './root-cmp'
import configureStore from './configure-store'
import '../src/assets/scss/main.scss'


// import reportWebVitals from './reportWebVitals';

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
      <Router>  
        <App />
    </Router>
  </Provider>
)
