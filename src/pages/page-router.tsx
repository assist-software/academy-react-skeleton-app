import { Route, Routes } from 'react-router-dom'

import { PAGES_PATHS } from 'common/constants/constant'

import { PageTodoList } from './page-todo-list'
import { PageDashboard } from './page-dashboard'
import { PageActivities } from './page-activity-suggestions'

export const PageRouter = () => {
  return (
    <Routes>
      <Route path={PAGES_PATHS.TODO_LIST} element={<PageTodoList />} />
      <Route path={PAGES_PATHS.DASHBOARD} element={<PageDashboard />} />
      <Route path={PAGES_PATHS.ACTIVITIES} element={<PageActivities />} />
    </Routes>
  )
}
