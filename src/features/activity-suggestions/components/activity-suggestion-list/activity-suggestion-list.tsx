import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ActivitySuggestionThumbnail } from 'features/activity-suggestions/components/activity-suggestion-thumbnail/activity-suggestion-thumbnail'
import { useStore } from 'store'

import styles from './activity-suggestion-list.module.scss'

export const SuggestionList = observer(() => {
  const { activitySuggestionStore } = useStore()
  const { activities } = activitySuggestionStore

  useEffect(() => {
    activitySuggestionStore.loadActivities()
  }, [])

  return (
    <div className={styles.list}>
      {activities.map((activity) => (
        <ActivitySuggestionThumbnail activity={activity} />
      ))}
    </div>
  )
})
