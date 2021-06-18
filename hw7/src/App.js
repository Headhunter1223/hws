import React from 'react'
import Home from './pages/Home/Home'
import Task from './pages/Task/Task'
import NoMatch from './pages/NoMatch/NoMatch'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {switchTheme} from './redux/actions'
class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <button
            type="button"
            className="switcher"
            onClick={this.props.switchTheme.bind(
              this,
              !this.props.reduxState.todo.theme
            )}
          >
            Поменять тему&nbsp;
            {this.props.reduxState.todo.theme ? 'Светлая' : 'Темная'}
          </button>
          <nav className="menu">
            <ul>
              <li>
                <Link to="/">to home</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/:projectId" exact>
              <Task />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

const mapDispatchToProps = {
  switchTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
