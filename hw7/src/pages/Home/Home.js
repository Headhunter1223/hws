import ProjectsList from '../../components/ProjectsList/ProjectsList'
import styles from './Home.module.scss'
import {connect} from 'react-redux'
import {changeProjectName, createProject} from '../../redux/actions'

const Home = props => {
  console.log(props.state)
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
          value={props.state.projectName}
        />
        <button type="submit" onClick={props.createProject}>
          Создать проект
        </button>
      </form>
    </>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = {
  changeProjectName,
  createProject
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
