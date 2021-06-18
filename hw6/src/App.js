import React from 'react'
import Home from './pages/Home/Home'
import Task from './pages/Task/Task'
import NoMatch from './pages/NoMatch/NoMatch'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      projectsById: {
        1: {
          id: 1,
          name: 'Первый проект',
          tasksIds: [1, 2]
        },
        2: {
          id: 2,
          name: 'Второй проект',
          tasksIds: [1, 3]
        }
      },
      tasksById: {
        1: {
          id: 1,
          name: 'Task #1',
          description: 'без описания',
          completed: false
        },
        2: {
          id: 2,
          name: 'Task #2',
          description: 'с описанием',
          completed: true
        },
        3: {
          id: 3,
          name: 'Task #3',
          description: 'странные описания',
          completed: true
        }
      },
      theme: true,
      projectName: '',
      taskName: '',
      taskDescription: '',
      taskCompleted: false
    }
  }

  switchTheme = () => {
    document.body.classList.toggle('dark')
    this.setState({theme: !this.state.theme})
  }

  projectNameHandler = e => this.setState({projectName: e.target.value})

  taskNameHandler = e => {
    this.setState({taskName: e.target.value})
  }

  taskDescriptionHandler = e => this.setState({taskDescription: e.target.value})

  taskCompletedHandler = e => this.setState({taskCompleted: e.target.value})

  createProject = () => {
    if (this.state.projectName) {
      const projectsById = {...this.state.projectsById}
      const id = Math.random()
      projectsById[id] = {
        id,
        name: this.state.projectName,
        tasksIds: []
      }
      this.setState({projectsById})
      return
    }
    alert('Впишите название проекта.')
  }

  createTask = projectId => {
    if (this.state.taskName && this.state.taskDescription) {
      const tasksById = {...this.state.tasksById}
      const projectsById = {...this.state.projectsById}
      const id = Math.random()
      tasksById[id] = {
        id,
        name: this.state.taskName,
        description: this.state.taskDescription,
        completed: this.state.taskCompleted
      }
      projectsById[projectId].tasksIds.push(id)
      this.setState({
        projectsById,
        tasksById
      })
      return
    }
    alert('Заполните все поля.')
  }

  render() {
    return (
      <>
        <Router>
          <button type="button" className="switcher" onClick={this.switchTheme}>
            Поменять тему
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
              <Home
                state={this.state}
                projectNameHandler={this.projectNameHandler}
                createProject={this.createProject}
                projectName={this.projectName}
              />
            </Route>
            <Route path="/:projectId" exact>
              <Task
                projects={this.state.projectsById}
                tasks={this.state.tasksById}
                taskNameHandler={this.taskNameHandler}
                taskDescriptionHandler={this.taskDescriptionHandler}
                taskCompletedHandler={this.taskCompletedHandler}
                taskName={this.taskName}
                taskDescription={this.state.taskDescription}
                taskCompleted={this.state.taskCompleted}
                createTask={this.createTask}
              />
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

export default App
