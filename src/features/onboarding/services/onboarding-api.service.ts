// import { Auth } from 'aws-amplify'

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
  // const username = email.replace('@', '.')

  // await Auth.signUp({
  //   username,
  //   password,
  //   attributes: {
  //     name,
  //     email,
  //     'custom:company': company,
  //     'custom:title': role,
  //     'custom:industry': industry,
  //     phone_number: phone,
  //   },
  //   autoSignIn: {
  //     enabled: false,
  //   },
  // })

  return new Promise<undefined>((resolve, reject) => {
    setTimeout(() => {
      if (Date.now() % 2 === 0) {
        resolve(undefined)
      } else {
        reject(new Error('User already exists'))
      }
    }, 3000)
  })
}

export const amplifyConfirmSignUp = async (username: string, code: string) => {
  // await Auth.confirmSignUp(username, code)

  return new Promise<undefined>((resolve, reject) => {
    setTimeout(() => {
      if (Date.now() % 2 === 0) {
        resolve(undefined)
      } else {
        reject(new Error('Username/client id combination not found.'))
      }
    }, 3000)
  })
}

export const amplifySignIn = async ({ email, password }: SignInFormData) => {
  // const username = email.replace('@', '.')
  // await Auth.signIn(username, password)
  // window.localStorage.setItem('userRole', 'Admin')

  return new Promise<undefined>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'cont.test@assist.ro' && password === 'test123*') {
        window.localStorage.setItem('userRole', 'Admin')
        resolve(undefined)
      } else {
        reject(new Error('Incorrect username or password.'))
      }
    }, 3000)
  })
}

export const amplifyForgotPassword = async (email: string) => {
  // const username = email.replace('@', '.')
  // await Auth.forgotPassword(username)

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 3000)
  })
}

export const amplifyForgotPasswordSubmit = async (
  username: string,
  code: string,
  newPassword: string,
) => {
  // await Auth.forgotPasswordSubmit(username, code, newPassword)

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 3000)
  })
}

export const amplifySignOut = async () => {
  // await Auth.signOut()
  // window.localStorage.removeItem('userRole')

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      window.localStorage.removeItem('userRole')
      resolve(undefined)
    }, 3000)
  })
}
