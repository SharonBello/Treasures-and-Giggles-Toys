import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { inc } from './store/actions/counter.action'
import { AppHeader} from '../src/cmps/app-header.jsx'
import { AppFooter } from '../src/cmps/app-footer.jsx'
import '../src/assets/scss/main.scss'

import routes from "./routes"

function _App(props) {
  return (
    <div id="app" className="main-layout">
      <AppHeader /> 
        <main className="main-content-container">
          <Switch>
          {routes.map(route => (
            <Route path={route.path} exact key={route.path} component={route.component} />
          ))}
          </Switch>
        </main>
     
      <AppFooter />
    </div>
  )
}

function mapStateToProps(storeState) {
  return {
    // count: storeState.countModule.count,
    // status: storeState.statusModule.status
  }
}
const mapDispatchToProps = {
  inc
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)