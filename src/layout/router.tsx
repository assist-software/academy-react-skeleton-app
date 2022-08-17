import { Route, Routes } from 'react-router-dom'

import { PATHS } from 'common/constants'

import { TodoListPage } from 'pages/todo-list-page'

export const Router = () => {
  return (
    <Routes>
      <Route path={PATHS.MY_FEATURE_PAGE} element={<TodoListPage />} />
    </Routes>
  )
}
