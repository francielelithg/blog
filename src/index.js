import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import './index.css'
import App from './pages/App'
import Author from './pages/Author'
import Publication from './pages/Publication'
import Search from './pages/Search'
import NotFound from './pages/404'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import reportWebVitals from './reportWebVitals'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#de4837'
    },
    secondary: {
      main: '#575757'
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/author/:id" component={Author} />
          <Route path="/publication/:id" component={Publication} />
          <Route path="/search/:string" component={Search} />
          <Route path='*' exact={true} component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
)

reportWebVitals()
