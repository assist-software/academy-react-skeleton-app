import { makeAutoObservable } from 'mobx'

import { ICommon } from 'common/models/models'
import { PAGES_PATHS } from 'common/constants/constant'
import { UtilService } from 'common/services/util-service'

import { ITodo } from '../models/todo-models'

import { TodoAPIService } from '../services/todo-api-service'
import { TodoUtilService } from '../services/todo-util-service'

export class TodoStore {
  todoList: ITodo[] | ICommon | any = []

  constructor() {
    makeAutoObservable(this)
    console.log('PAGES_PATHS: ', PAGES_PATHS)
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
