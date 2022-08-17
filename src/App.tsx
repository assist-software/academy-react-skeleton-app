import { Router } from 'layout/router'
import { TodoList } from 'features/todo'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router />
        <TodoList />
      </header>
    </div>
  )
}

export default App
