import { createContext, useContext } from 'react'

import { TodoStore } from 'features/todo'
import { ActivitySuggestionStore } from 'features/activity-suggestions'

const store = {
  todoStore: new TodoStore(),
  activitySuggestionStore: new ActivitySuggestionStore(),
}

export const useStore = () => {
  return useContext(createContext(store))
}
