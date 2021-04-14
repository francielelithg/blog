import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import './index.css'
import App from './pages/App'
import Publication from './pages/Publication'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/publication" component={Publication} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)

reportWebVitals()
