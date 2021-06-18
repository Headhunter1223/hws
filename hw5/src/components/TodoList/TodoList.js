import Todo from '../Todo/Todo'
import styles from './TodoList.module.scss'

const TodoList = ({todos, toggleComplete}) => {
  return (
    <div className={styles.TodoList}>
      {todos &&
        todos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            toggleComplete={() => toggleComplete(todo, index)}
          />
        ))}
    </div>
  )
}

export default TodoList
