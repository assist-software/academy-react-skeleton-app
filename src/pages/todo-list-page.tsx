import { TodoList } from 'features/todo'
import { ActivitySuggestionRandomItem } from 'features/activity-suggestions'

export const TodoListPage = () => {
  return (
    <div>
      <TodoList />
      <ActivitySuggestionRandomItem />
    </div>
  )
}
