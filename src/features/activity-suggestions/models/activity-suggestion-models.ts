import { ACTIVITY_DIFFICULTY } from 'features/activity-suggestions/constants/activity-suggestion-constants'

export type IActivityDifficulty = typeof ACTIVITY_DIFFICULTY[keyof typeof ACTIVITY_DIFFICULTY]

export interface IActivitySuggestion {
  title: string
  description: string
  imageSrc: string
  difficulty: IActivityDifficulty
}
