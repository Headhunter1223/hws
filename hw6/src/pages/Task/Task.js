import styles from './Task.module.scss'
import {useParams} from 'react-router-dom'

const Task = props => {
  const projectId = useParams().projectId
  return (
    <>
      <h1 className={styles.title}>{props.projects[projectId].name}</h1>

      <div>
        {props.projects[projectId].tasksIds.map((el, id) => {
          return (
            <div className={styles.Task} key={id}>
              <h2>Название задачи:&nbsp;{props.tasks[el].name}</h2>
              <p>Описание задачи:&nbsp;{props.tasks[el].description}</p>
              <p>{props.tasks[el].completed ? 'Сделано' : 'Не сделано'}</p>
            </div>
          )
        })}
      </div>

      <form className={styles.createTask} onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Название задачи"
          onChange={props.taskNameHandler}
          value={props.taskName}
        />
        <input
          type="text"
          placeholder="Описание"
          onChange={props.taskDescriptionHandler}
          value={props.taskDescription}
        />
        <div>
          <span>Статус задачи:&nbsp;</span>
          <input
            type="checkbox"
            onChange={props.taskCompletedHandler}
            value={props.taskCompleted}
          />
        </div>
        <button type="submit" onClick={props.createTask.bind(this, projectId)}>
          Создать задачу
        </button>
      </form>
    </>
  )
}

export default Task
