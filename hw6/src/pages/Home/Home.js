import ProjectsList from '../../components/ProjectsList/ProjectsList'
import styles from './Home.module.scss'

const Home = props => {
  return (
    <>
      <div className={styles.Home}>
        <h2>Todo app</h2>
        <ProjectsList
          projects={props.state.projectsById}
          tasks={props.state.tasksById}
        />
      </div>

      <form className={styles.createProject} onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Название проекта"
          onChange={props.projectNameHandler}
          value={props.projectName}
        />
        <button type="submit" onClick={props.createProject}>
          Создать проект
        </button>
      </form>
    </>
  )
}

export default Home
