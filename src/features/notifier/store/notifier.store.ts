import { makeAutoObservable } from 'mobx'
import { ToastMessage } from 'primereact/toast'

export class NotifierStore {
  messages: ToastMessage[] = []

  constructor() {
    makeAutoObservable(this)
  }

  pushMessage(message: ToastMessage) {
    this.messages.push(message)
  }

  clearAllMessages() {
    this.messages = []
  }
}
