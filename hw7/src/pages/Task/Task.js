import styles from './Task.module.scss'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  changeTaskName,
  changeTaskDescription,
  changeCompleted,
  createTask
} from '../../redux/actions'

const Task = props => {
  const projectId = useParams().projectId
  return (
    <>
      <h1 className={styles.title}>
        {props.state.todo.projectsById[projectId].name}
      </h1>

      <div>
        {props.state.todo.projectsById[projectId].tasksIds.map((el, id) => {
          return (
            <div className={styles.Task} key={id}>
              <h2>
                Название задачи:&nbsp;
                {props.state.todo.tasksById[el] !== undefined
                  ? props.state.todo.tasksById[el].name
                  : ''}
              </h2>
              <p>
                Описание задачи:&nbsp;
                {props.state.todo.tasksById[el] !== undefined
                  ? props.state.todo.tasksById[el].description
                  : ''}
              </p>
              <p>
                {props.state.todo.tasksById[el] === undefined
                  ? ''
                  : props.state.todo.tasksById[el].completed
                  ? 'Сделано'
                  : 'Не сделано'}
              </p>
            </div>
          )
        })}
      </div>

      <form className={styles.createTask} onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Название задачи"
          onChange={e => props.changeTaskName(e.target.value)}
          value={props.state.todo.taskName}
        />
        <input
          type="text"
          placeholder="Описание"
          onChange={e => props.changeTaskDescription(e.target.value)}
          value={props.state.todo.taskDescription}
        />
        <div>
          <span>Статус задачи:&nbsp;</span>
          <input
            type="checkbox"
            checked={props.state.todo.taskCompleted}
            onChange={props.changeCompleted.bind(
              this,
              !props.state.todo.taskCompleted
            )}
          />
        </div>
        <button type="submit" onClick={props.createTask.bind(this, projectId)}>
          Создать задачу
        </button>
      </form>
    </>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = {
  changeTaskName,
  changeTaskDescription,
  changeCompleted,
  createTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
