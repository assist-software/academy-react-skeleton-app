export interface CognitoUserAttribute {
  Name: string
  Value: string
}

export interface CognitoUserData {
  'custom:title': string
  'custom:industry': string
  sub: string
  email_verified: string
  name: string
  phone_number_verified: string
  phone_number: string
  email: string
  'custom:company': string
}

export interface AuthUserData {
  username: string
  name: string
  email: string
  company: string
  role: string
  industry: string
  phone: string
}
