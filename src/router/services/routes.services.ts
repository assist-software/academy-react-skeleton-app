import { RouteObject } from 'react-router-dom'

import { routeObjectsWithRoles } from 'router/constants/routes.const'

export const getRouteObjectsByRole = (userRole: string): RouteObject[] => {
  const userRouteObjects = routeObjectsWithRoles
    .filter((routeObjectWithRoles) =>
      routeObjectWithRoles.roles.some((role) => role.valueOf() === userRole),
    )
    .map(
      (routeObjectWithRoles): RouteObject => ({
        path: routeObjectWithRoles.path,
        element: routeObjectWithRoles.element,
      }),
    )

  return userRouteObjects
}
