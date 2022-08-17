import { IActivitySuggestion } from 'features/activity-suggestions/models/activity-suggestion-models'
import styles from './activity-suggestion-thumbnail.module.scss'

interface Props {
  activity: IActivitySuggestion
}

export const ActivitySuggestionThumbnail = ({ activity }: Props) => {
  return (
    <div className={styles.thumbnail}>
      <h2>{activity.title}</h2>
      <p>{activity.description}</p>
      <p>{activity.difficulty}</p>
    </div>
  )
}
