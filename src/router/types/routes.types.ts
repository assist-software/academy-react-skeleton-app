import { RouteObject } from 'react-router-dom'

import { Roles } from '../constants/roles.const'

export interface RouteObjectWithRoles extends RouteObject {
  roles: Roles[]
}
