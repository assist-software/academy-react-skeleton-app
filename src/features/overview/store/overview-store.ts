import { makeAutoObservable } from 'mobx'

export class OverviewStore {
  constructor() {
    makeAutoObservable(this)
  }
}
