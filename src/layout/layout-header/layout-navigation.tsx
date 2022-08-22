import { Link } from 'react-router-dom'

import { PAGES_PATHS } from 'common/constants/constant'

export const LayoutNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={PAGES_PATHS.DASHBOARD}>Dashboard</Link>
        </li>

        <li>
          <Link to={PAGES_PATHS.ACTIVITIES}>Activities</Link>
        </li>

        <li>
          <Link to={PAGES_PATHS.TODO_LIST}>Todo</Link>
        </li>
      </ul>
    </nav>
  )
}
