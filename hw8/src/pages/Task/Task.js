import styles from './Task.module.scss'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import React from 'react'
import {request} from '../../api/requests'
import {
  changeTaskName,
  changeTaskDescription,
  changeCompleted,
  createTask,
  saveTasks
} from '../../redux/actions'

const Task = props => {
  const [name, changeName] = React.useState('')
  const [movedTaskId, changeIdTask] = React.useState('')
  const [movedIdProject, changeIdProject] = React.useState('')
  const [description, changeDescription] = React.useState('')
  const [completed, changeCompleted] = React.useState('')
  const [task, changeTask] = React.useState([])
  const {projectId, projectKey} = useParams()

  React.useEffect(() => {
    request(`api/projects/${projectId}/tasks/`)
      .then(res => res.json())
      .then(data => {
        const ids = data.map(el => ({
          id: el.id,
          name: el.name
        }))
        changeTask(ids)
        props.saveTasks({...data})
      })
  }, [])

  function createTask(id) {
    request(`api/projects/${id}/tasks/`, 'POST', {
      name: props.state.todo.taskName,
      description: props.state.todo.taskDescription,
      priority: 1,
      completed: props.state.todo.taskCompleted
    }).then(() => {
      request(`api/projects/${id}/tasks/`)
        .then(res => res.json())
        .then(data => {
          const ids = data.map(el => ({
            id: el.id,
            name: el.name
          }))
          changeTask(ids)
          props.saveTasks({...data})
        })
    })
  }

  function acChangeTask() {
    console.log(movedIdProject)
    request(`api/projects/${projectId}/tasks/${movedTaskId}`, 'PUT', {
      name,
      description,
      priority: 1,
      completed,
      projectId: +movedIdProject
    }).then(() => {
      request(`api/projects/${projectId}/tasks/`)
        .then(res => res.json())
        .then(data => {
          const ids = data.map(el => ({
            id: el.id,
            name: el.name
          }))
          changeTask(ids)
          props.saveTasks({...data})
        })
    })
  }

  const showChange = () => {
    return (
      <>
        <span>Изменить задачу:&nbsp;</span>
        <select onChange={e => changeIdTask(e.target.value)}>
          {task.map((el, key) => {
            return (
              <option key={key} value={el.id}>
                {el.name}
              </option>
            )
          })}
        </select>
        <input
          type="text"
          placeholder="Название задачи"
          onChange={e => changeName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Описание"
          onChange={e => changeDescription(e.target.value)}
          value={description}
        />
        <div>
          <span>Статус задачи:&nbsp;</span>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => changeCompleted(!completed)}
          />
        </div>
        <span>Перенести в проект:&nbsp;</span>
        <select onChange={e => changeIdProject(e.target.value)}>
          {Object.keys(props.state.todo.projectsById).map((el, key) => {
            return (
              <option key={key} value={props.state.todo.projectsById[el].id}>
                {props.state.todo.projectsById[el].name}
              </option>
            )
          })}
        </select>
        <button type="button" onClick={acChangeTask}>
          Сохранить
        </button>
      </>
    )
  }

  return (
    <>
      <h1 className={styles.title}>
        {props.state.todo.projectsById[projectKey].name}
      </h1>

      <div>
        {Object.keys(props.state.todo.actualTasks).map((el, id) => {
          return (
            <div className={styles.Task} key={id}>
              <h2>
                Название задачи:&nbsp;
                {props.state.todo.actualTasks[el].name}
              </h2>
              <p>
                Описание задачи:&nbsp;
                {props.state.todo.actualTasks[el].description}
              </p>
              <p>
                {props.state.todo.actualTasks[el].completed
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
        <button type="submit" onClick={createTask.bind(this, projectId)}>
          Создать задачу
        </button>
      </form>

      <h3>Изменить задачу</h3>
      <div className={styles.changeTask}>{showChange()}</div>
    </>
  )
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = {
  changeTaskName,
  changeTaskDescription,
  changeCompleted,
  createTask,
  saveTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
