import { makeAutoObservable } from 'mobx'

import { UtilService } from 'common/services/UtilService'
import { IActivitySuggestion } from 'features/activity-suggestions/models/activity-suggestion-models'
import { ActivitySuggestionAPIService } from 'features/activity-suggestions/services/activity-suggestions-api-service'

export class ActivitySuggestionStore {
  activities: IActivitySuggestion[] = []

  constructor() {
    makeAutoObservable(this)
  }

  loadActivities = async () => {
    const activities = await ActivitySuggestionAPIService.fetchActivities()
    const activitiesWithKeys = UtilService.addKeysToListItems(activities)

    this.setActivities(activitiesWithKeys)
  }

  private setActivities = (activities: IActivitySuggestion[]) => {
    this.activities = activities
  }
}
