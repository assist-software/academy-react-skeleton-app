import { createContext, useContext } from 'react'

import { ActivitySuggestionStore } from 'features/activity-suggestions'
import { TodoStore } from 'features/todo'

const store = {
  todoStore: new TodoStore(),
  activitySuggestionStore: new ActivitySuggestionStore(),
}

export const useStore = () => {
  return useContext(createContext(store))
}
