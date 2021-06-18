import {
  CHANGE_PROJECT_NAME,
  CREATE_PROJECT,
  SWITCH_THEME,
  CHANGE_TASK_NAME,
  CHANGE_DESCRIPTION,
  CHANGE_COMPLETED,
  CREATE_TASK,
  SAVE_PROJECTS,
  SAVE_TASKS
} from './types'

const initialState = {
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
  actualTasks: {
    0: {
      id: 30,
      name: 'первая задача',
      description: 'описание',
      completed: false
    }
  },
  theme: true,
  projectName: '',
  taskName: '',
  taskDescription: '',
  taskCompleted: false
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROJECTS:
      return {...state, projectsById: action.payload}
    case SAVE_TASKS:
      return {...state, actualTasks: action.payload}
    case SWITCH_THEME:
      return {...state, theme: action.payload}
    case CHANGE_PROJECT_NAME:
      return {...state, projectName: action.payload}
    case CREATE_PROJECT:
      return {...state, projectsById: action.payload}
    case CHANGE_TASK_NAME:
      return {...state, taskName: action.payload}
    case CHANGE_DESCRIPTION:
      return {...state, taskDescription: action.payload}
    case CHANGE_COMPLETED:
      return {...state, taskCompleted: action.payload}
    case CREATE_TASK:
      return {
        ...state,
        projectsById: action.payload.projectsById,
        tasksById: action.payload.tasksById
      }
    default:
      return state
  }
}
