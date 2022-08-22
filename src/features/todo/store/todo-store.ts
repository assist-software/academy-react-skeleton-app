import { makeAutoObservable } from 'mobx'

import { UtilService } from 'common/services/UtilService'

import { ITodo } from '../models/todo-models'
import { TodoUtilService } from '../services/todo-util-service'
import { TodoAPIService } from '../services/todo-api-service'

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
