import { Route, Routes } from 'react-router-dom'

import { PAGES_PATHS } from 'pages/constants/pages-constants'

import { TodoListPage } from 'pages/todo-list-page'
import { DashboardPage } from 'pages/dashboard-page'
import { ActivitiesPage } from 'pages/activity-suggestions-page'

export const Router = () => {
  return (
    <Routes>
      <Route path={PAGES_PATHS.TODO_LIST} element={<TodoListPage />} />
      <Route path={PAGES_PATHS.DASHBOARD} element={<DashboardPage />} />
      <Route path={PAGES_PATHS.ACTIVITIES} element={<ActivitiesPage />} />
    </Routes>
  )
}
