// import { Auth } from 'aws-amplify'
// import { nanoid } from 'nanoid'

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
  // await Auth.signUp({
  //   username: nanoid(),
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
      if (email !== 'cont.test@assist.ro') {
        resolve(undefined)
      } else {
        reject(new Error('User already exists'))
      }
    }, 2000)
  })
}

export const amplifyConfirmSignUp = async (username: string, code: string) => {
  // await Auth.confirmSignUp(username, code)

  return new Promise<undefined>((resolve, reject) => {
    setTimeout(() => {
      if (username === 'cont.test.assist.ro') {
        resolve(undefined)
      } else {
        reject(new Error('Username/client id combination not found.'))
      }
    }, 2000)
  })
}

export const amplifySignIn = async ({ email, password }: SignInFormData) => {
  // await Auth.signIn(email, password)
  // window.localStorage.setItem('userRole', 'Admin')

  return new Promise<undefined>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'cont.test@assist.ro' && password === 'test123*') {
        window.localStorage.setItem('userRole', 'Admin')
        resolve(undefined)
      } else {
        reject(new Error('Incorrect username or password.'))
      }
    }, 2000)
  })
}

export const amplifyForgotPassword = async (email: string) => {
  // await Auth.forgotPassword(email)

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 2000)
  })
}

export const amplifyForgotPasswordSubmit = async (
  username: string,
  code: string,
  newPassword: string,
) => {
  // await Auth.forgotPasswordSubmit(username, code, newPassword)

  return new Promise<undefined>((resolve, reject) => {
    setTimeout(() => {
      if (code === '703733') {
        resolve(undefined)
      } else {
        reject(new Error('Invalid verification code provided, please try again.'))
      }
    }, 2000)
  })
}

export const amplifySignOut = async () => {
  // await Auth.signOut()
  // window.localStorage.removeItem('userRole')

  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      window.localStorage.removeItem('userRole')
      resolve(undefined)
    }, 2000)
  })
}
