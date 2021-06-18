import styles from './TodoForm.module.scss'

const TodoForm = props => {
  return (
    <form className={styles.TodoForm} onSubmit={e => e.preventDefault()}>
      <div>
        <input
          name="todo"
          value={props.name}
          type="text"
          onChange={props.inputChangeHandler}
          data-role="name"
          placeholder="Enter task name"
        />
        <input
          type="text"
          placeholder="Enter task description"
          data-role="description"
          value={props.description}
          onChange={props.inputChangeHandler}
        />
      </div>

      <div>
        <button type="submit" onClick={props.addTask}>
          Add Todo
        </button>

        <button onClick={props.clearCompleted}>Clear Completed</button>
      </div>
    </form>
  )
}

export default TodoForm
