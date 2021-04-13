import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/App'
import Publication from './pages/Publication'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/publication" component={Publication} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
)

reportWebVitals()
