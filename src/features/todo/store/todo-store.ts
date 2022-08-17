import { makeAutoObservable } from 'mobx'

import { ITodo } from 'features/todo/models/todo-models'
import { TodoUtilService } from 'features/todo/services/todo-util-service'
import { TodoAPIService } from 'features/todo/services/todo-api-service'
import { UtilService } from 'common/services/UtilService'

export class TodoStore {
  todoList: ITodo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get todoListLite() {
    return TodoUtilService.getTodoListLite(this.todoList)
  }

  loadTodoList = async () => {
    const todoList = await TodoAPIService.fetchTodoList()
    const todoListWithKeys = UtilService.addKeysToListItems(todoList)

    this.setTodoList(todoListWithKeys)
  }

  private setTodoList = (todoList: ITodo[]) => {
    this.todoList = todoList
  }
}
