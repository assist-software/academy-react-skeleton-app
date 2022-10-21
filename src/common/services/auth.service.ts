import { Amplify, Auth } from 'aws-amplify'

import { AuthUserData /*, CognitoUserAttribute, CognitoUserData*/ } from 'common/types/auth.types'
import { Roles } from 'router/constants/roles.const'

export const configureAmplify = () => {
  const {
    REACT_APP_AWS_COGNITO_REGION: region,
    REACT_APP_AWS_COGNITO_USER_POOL_ID: userPoolId,
    REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID: userPoolWebClientId,
  } = process.env

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region,
      userPoolId,
      userPoolWebClientId,
    },
  })
}

export const getAuthenticatedUserRole = (): string => {
  return window.localStorage.getItem('userRole') || Roles.Public
}

export const getAuthIdToken = async (): Promise<string> => {
  const currentSession = await Auth.currentSession()
  return currentSession.getIdToken().getJwtToken()
}

export const getAuthUserData = (): AuthUserData | null => {
  return {
    username: 'cont.test.assist.ro',
    name: 'Cont Test',
    email: 'cont.test@assist.ro',
    company: 'Assist',
    role: 'SDE',
    industry: 'IT',
    phone: '+40753535353',
  }

  // const { REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID: userPoolWebClientId } = process.env
  // const localStorageKeyPrefix = `CognitoIdentityServiceProvider.${userPoolWebClientId}`

  // const lastAuthUser = window.localStorage.getItem(`${localStorageKeyPrefix}.LastAuthUser`)

  // if (!lastAuthUser) {
  //   return null
  // }

  // const userData = window.localStorage.getItem(`${localStorageKeyPrefix}.${lastAuthUser}.userData`)

  // if (!userData) {
  //   return null
  // }

  // const userAttributes: CognitoUserAttribute[] = JSON.parse(userData).UserAttributes

  // const userAttributesObject: CognitoUserData = userAttributes.reduce(
  //   (userAttributesObject: any, { Name, Value }) => {
  //     userAttributesObject[Name] = Value
  //     return userAttributesObject
  //   },
  //   {},
  // )

  // return {
  //   username: lastAuthUser,
  //   name: userAttributesObject.name,
  //   email: userAttributesObject.email,
  //   company: userAttributesObject['custom:company'],
  //   role: userAttributesObject['custom:title'],
  //   industry: userAttributesObject['custom:industry'],
  //   phone: userAttributesObject.phone_number,
  // }
}
