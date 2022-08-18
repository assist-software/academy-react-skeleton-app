import { makeAutoObservable } from 'mobx'

import { UtilService } from 'common/services/UtilService'

import { IActivitySuggestion } from 'features/activity-suggestions/models/activity-suggestion-models'
import { ActivitySuggestionAPIService } from 'features/activity-suggestions/services/activity-suggestions-api-service'

export class ActivitySuggestionStore {
  activities: IActivitySuggestion[] = []
  activitySuggestion: IActivitySuggestion | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesAreLoaded() {
    return this.activities.length > 0
  }

  loadActivities = async () => {
    const activities = await ActivitySuggestionAPIService.fetchActivities()
    const activitiesWithKeys = UtilService.addKeysToListItems(activities)

    this.setActivities(activitiesWithKeys)
  }

  checkIfActivitiesAreLoaded = () => {}

  selectActivitySuggestion = async () => {
    if (!this.activitiesAreLoaded) await this.loadActivities()

    const min = 0
    const max = this.activities.length - 1
    const luckyActivityIndex = UtilService.getRandomInt({ min, max })

    this.setActivitySuggestion(this.activities[luckyActivityIndex])
  }

  private setActivitySuggestion = (activitySuggestion: IActivitySuggestion) => {
    this.activitySuggestion = activitySuggestion
  }

  private setActivities = (activities: IActivitySuggestion[]) => {
    this.activities = activities
  }
}
