import { createContext, useContext } from 'react'

import { ActivitySuggestionStore } from 'features/activity-suggestions'
import { OverviewStore } from 'features/overview'
import { TodoStore } from 'features/todo'

const store = {
  todoStore: new TodoStore(),
  activitySuggestionStore: new ActivitySuggestionStore(),
  overviewStore: new OverviewStore(),
}

export const useStore = () => {
  return useContext(createContext(store))
}
