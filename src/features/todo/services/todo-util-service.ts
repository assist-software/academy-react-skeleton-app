import { ITodo, ITodoLite } from 'features/todo/models/todo-models'

const getTodoListLite = (todoList: ITodo[]) => {
  const todoListLite: ITodoLite[] = todoList.map((todo) => ({
    title: todo.title,
    key: todo.key,
    done: todo.done,
  }))

  return todoListLite
}

export const TodoUtilService = {
  getTodoListLite,
}
