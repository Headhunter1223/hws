import styles from './Todo.module.scss'

const Todo = props => {
  return (
    <div className={styles.Todo}>
      <div>
        <p className={props.todo.completed ? styles.done : null}>
          {props.todo.task}: {props.todo.completed ? 'Сделано' : 'Не сделано'}
        </p>

        <button
          key={props.todo.id}
          onClick={() => {
            props.toggleComplete(props.todo)
          }}
        >
          Сделать
        </button>
      </div>

      <div className={styles.description}>
        Описание: {props.todo.description}
      </div>
    </div>
  )
}

export default Todo
