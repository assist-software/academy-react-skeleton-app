import { RouteObjectWithRoles } from 'router/types/routes.types'
import { Roles } from 'router/constants/roles.const'
import { Error404Page } from 'pages/error-404-page'
import { SignUpStep1Page } from 'pages/onboarding/sign-up-step-1-page'
import { SignUpStep2Page } from 'pages/onboarding/sign-up-step-2-page'
import { SignUpConfirmPage } from 'pages/onboarding/sign-up-confirm-page'
import { SignInPage } from 'pages/onboarding/sign-in-page'
import { ForgotPasswordPage } from 'pages/onboarding/forgot-password-page'
import { ResetPasswordPage } from 'pages/onboarding/reset-password-page'
import { ProjectsPage } from 'pages/projects/projects-page'
import { CreateProjectPage } from 'pages/projects/create-project-page'
import { UpdateProjectStep1Page } from 'pages/projects/update-project-step-1-page'
import { UpdateProjectStep2Page } from 'pages/projects/update-project-step-2-page'

export const routeObjectsWithRoles: RouteObjectWithRoles[] = [
  {
    path: '/sign-up-step-1',
    element: <SignUpStep1Page />,
    roles: [Roles.Public],
  },
  {
    path: '/sign-up-step-2',
    element: <SignUpStep2Page />,
    roles: [Roles.Public],
  },
  {
    path: '/sign-up-confirm',
    element: <SignUpConfirmPage />,
    roles: [Roles.Public],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
    roles: [Roles.Public],
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    roles: [Roles.Public],
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
    roles: [Roles.Public],
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
    roles: [Roles.Admin],
  },
  {
    path: '/create-project',
    element: <CreateProjectPage />,
    roles: [Roles.Admin],
  },
  {
    path: '/update-project-step-1/:id',
    element: <UpdateProjectStep1Page />,
    roles: [Roles.Admin],
  },
  {
    path: '/update-project-step-2/:id',
    element: <UpdateProjectStep2Page />,
    roles: [Roles.Admin],
  },
  {
    path: '*',
    element: <Error404Page />,
    roles: [Roles.Public, Roles.Admin],
  },
]
