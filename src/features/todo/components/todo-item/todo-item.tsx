import { ITodo } from 'features/todo/models/todo-models'

import styles from './todo-item.module.scss'

interface Props {
  todo: ITodo
}

export const TodoItem = ({ todo }: Props) => {
  return (
    <>
      {todo && (
        <div className={styles.item}>
          <h2 className={styles.itemTitle}>{todo.title}</h2>
          <p className={styles.itemDescription}>{todo.description}</p>
          <input className={styles.itemDone} type='checkbox' defaultChecked={todo.done} />
        </div>
      )}
    </>
  )
}
