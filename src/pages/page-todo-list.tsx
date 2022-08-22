import { TodoList } from 'features/todo'
import { ActivitySuggestionRandomItem } from 'features/activity-suggestions'

export const PageTodoList = () => {
  return (
    <div>
      <TodoList />
      <ActivitySuggestionRandomItem />
    </div>
  )
}
