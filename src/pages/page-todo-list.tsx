import { ActivitySuggestionRandomItem } from 'features/activity-suggestions'
import { TodoList } from 'features/todo'

export const PageTodoList = () => {
  return (
    <div>
      <TodoList />
      <ActivitySuggestionRandomItem />
    </div>
  )
}
