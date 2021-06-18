import React from 'react'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import styles from './Home.module.scss'
import {connect} from 'react-redux'
import {request} from '../../api/requests'
import {
  changeProjectName,
  createProject,
  saveProjects
} from '../../redux/actions'

const Home = props => {
  React.useEffect(() => {
    request('api/projects/', 'GET')
      .then(res => res.json())
      .then(data => props.saveProjects({...data}))
  }, [])

  function createProject() {
    request('api/projects/', 'POST', {name: props.state.todo.projectName}).then(
      () => {
        request('api/projects/', 'GET')
          .then(res => res.json())
          .then(data => props.saveProjects({...data}))
      }
    )
  }
  return (
    <>
      <div className={styles.Home}>
        <h2>Todo app</h2>
        <ProjectsList />
      </div>

      <form className={styles.createProject} onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Название проекта"
          onChange={e => props.changeProjectName(e.target.value)}
          value={props.state.todo.projectName}
        />
        <button type="submit" onClick={createProject}>
          Создать проект
        </button>
      </form>
    </>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = {
  changeProjectName,
  createProject,
  saveProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
