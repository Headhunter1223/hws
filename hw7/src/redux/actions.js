import {
  CHANGE_PROJECT_NAME,
  CREATE_PROJECT,
  SWITCH_THEME,
  CHANGE_TASK_NAME,
  CHANGE_DESCRIPTION,
  CHANGE_COMPLETED,
  CREATE_TASK
} from './types'
import {store} from '../index'

export const switchTheme = payload => {
  document.body.classList.toggle('dark')
  return {type: SWITCH_THEME, payload}
}

export const changeProjectName = payload => ({
  type: CHANGE_PROJECT_NAME,
  payload
})

export const createProject = payload => {
  const projectName = store.getState().todo.projectName
    ? store.getState().todo.projectName
    : 'Без названия'
  const projectsById = {...store.getState().todo.projectsById}
  const id = Math.random()
  projectsById[id] = {
    id,
    name: projectName,
    tasksIds: []
  }
  return {
    type: CREATE_PROJECT,
    payload: projectsById
  }
}

export const changeTaskName = payload => ({
  type: CHANGE_TASK_NAME,
  payload
})

export const changeCompleted = payload => ({
  type: CHANGE_COMPLETED,
  payload
})

export const changeTaskDescription = payload => ({
  type: CHANGE_DESCRIPTION,
  payload
})

export const createTask = payload => {
  const taskName = store.getState().todo.taskName
    ? store.getState().todo.taskName
    : 'Без названия'
  const taskDescription = store.getState().todo.taskDescription
    ? store.getState().todo.taskDescription
    : 'Без описания'
  const tasksById = {...store.getState().todo.tasksById}
  const projectsById = {...store.getState().todo.projectsById}
  const id = Math.random()
  tasksById[id] = {
    id,
    name: taskName,
    description: taskDescription,
    completed: store.getState().todo.taskCompleted
  }
  projectsById[payload].tasksIds.push(id)
  return {
    type: CREATE_TASK,
    payload: {tasksById, projectsById}
  }
}
