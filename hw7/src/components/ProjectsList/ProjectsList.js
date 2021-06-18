import {Link} from 'react-router-dom'
import styles from './ProjectsList.module.scss'
import {connect} from 'react-redux'

const ProjectsList = props => {
  return (
    <>
      {Object.keys(props.state.todo.projectsById).map((el, projectKey) => {
        return (
          <Link
            className={styles.ProjectsList}
            key={projectKey}
            to={{
              pathname: `/${el}`
            }}
          >
            <span>
              Название проекта:&nbsp;{props.state.todo.projectsById[el].name}
            </span>
          </Link>
        )
      })}
    </>
  )
}

const mapStateToProps = state => ({state})

export default connect(mapStateToProps, null)(ProjectsList)
