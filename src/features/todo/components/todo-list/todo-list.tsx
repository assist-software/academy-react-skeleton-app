import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import { useStore } from 'store'
import { TodoItem } from 'features/todo/components/todo-item/todo-item'
import { TodoItemLite } from 'features/todo/components/todo-item-lite/todo-item-lite'

export const TodoList = observer(() => {
  const { todoStore } = useStore()
  const { todoList, todoListLite } = todoStore

  useEffect(() => {
    todoStore.loadTodoList()
  }, [])

  return (
    <div>
      {todoList.map((todo) => (
        <TodoItem key={todo.key} todo={toJS(todo)} />
      ))}

      {todoListLite.map((todo) => (
        <TodoItemLite key={todo.key} todo={toJS(todo)} />
      ))}
    </div>
  )
})
