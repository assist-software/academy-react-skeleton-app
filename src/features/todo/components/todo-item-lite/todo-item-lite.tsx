import { ITodoLite } from '../../models/todo-models'

import styles from './todo-item-lite.module.scss'

interface Props {
  todo: ITodoLite
}

export const TodoItemLite = ({ todo }: Props) => {
  return (
    <div className={styles.itemLite}>
      <h3 className={styles.itemLiteTitle}>{todo.title}</h3>
    </div>
  )
}
