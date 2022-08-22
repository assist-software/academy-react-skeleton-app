import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import { useStore } from 'common/store/store'

import { ITodo } from '../../models/todo-models'
import { MY_FEATURE_ANOTHER_CONSTANT } from '../../constants/todo-constants'

import { TodoItem } from '../todo-item/todo-item'
import { TodoItemLite } from '../todo-item-lite/todo-item-lite'

export const TodoList = observer(() => {
  const { todoStore } = useStore()
  const { todoList, todoListLite } = todoStore

  useEffect(() => {
    todoStore.loadTodoList()
    console.log('MY_FEATURE_ANOTHER_CONSTANT: ', MY_FEATURE_ANOTHER_CONSTANT)
  }, [])

  return (
    <div>
      {todoList.map((todo: ITodo) => (
        <TodoItem key={todo.key} todo={toJS(todo)} />
      ))}

      {todoListLite.map((todo) => (
        <TodoItemLite key={todo.key} todo={toJS(todo)} />
      ))}
    </div>
  )
})
