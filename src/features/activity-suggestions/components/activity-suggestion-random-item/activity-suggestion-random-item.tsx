import { observer } from 'mobx-react-lite'

import { useStore } from 'common/store/store'

import { ActivitySuggestionThumbnail } from 'features/activity-suggestions/components/activity-suggestion-thumbnail/activity-suggestion-thumbnail'

export const ActivitySuggestionRandomItem = observer(() => {
  const { activitySuggestionStore } = useStore()
  const { activitySuggestion } = activitySuggestionStore

  return (
    <div>
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          activitySuggestionStore.selectActivitySuggestion()
        }}>
        Suggest me an activity
      </button>

      {activitySuggestion && <ActivitySuggestionThumbnail activity={activitySuggestion} />}
    </div>
  )
})
