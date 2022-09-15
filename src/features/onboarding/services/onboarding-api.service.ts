import { Auth } from 'aws-amplify'

import { SignInFormData, SignUpFormsData } from '../types/onboarding-forms.types'

export const amplifySignUp = async ({
  name,
  email,
  password,
  company,
  role,
  industry,
  phone,
}: SignUpFormsData) => {
  const username = email.replace('@', '.')

  await Auth.signUp({
    username,
    password,
    attributes: {
      name,
      email,
      'custom:company': company,
      'custom:title': role,
      'custom:industry': industry,
      phone_number: phone,
    },
    autoSignIn: {
      enabled: false,
    },
  })
}

export const amplifyConfirmSignUp = async (username: string, code: string) => {
  await Auth.confirmSignUp(username, code)
}

export const amplifySignIn = async ({ email, password }: SignInFormData) => {
  const username = email.replace('@', '.')
  await Auth.signIn(username, password)
  window.localStorage.setItem('userRole', 'Admin')
}

export const amplifyForgotPassword = async (email: string) => {
  const username = email.replace('@', '.')
  await Auth.forgotPassword(username)
}

export const amplifyForgotPasswordSubmit = async (
  username: string,
  code: string,
  newPassword: string,
) => {
  await Auth.forgotPasswordSubmit(username, code, newPassword)
}

export const amplifySignOut = async () => {
  await Auth.signOut()
  window.localStorage.removeItem('userRole')
}
