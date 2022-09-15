import { useRoutes } from 'react-router-dom'

import { getAuthenticatedUserRole } from 'common/services/auth.service'
import { getRouteObjectsByRole } from './services/routes.services'

export const Router = () => {
  return useRoutes(getRouteObjectsByRole(getAuthenticatedUserRole()))
}
