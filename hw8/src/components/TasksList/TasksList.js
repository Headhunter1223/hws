import {useParams} from 'react-router-dom'
import styles from 'TasksList.module.scss'

const TasksList = props => {
  const id = useParams()
  console.log(id)
  return <div>{props}</div>
}

export default TasksList
