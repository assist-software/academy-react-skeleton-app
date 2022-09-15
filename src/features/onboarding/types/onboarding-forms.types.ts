export interface SignUpStep1FormData {
  name: string
  email: string
  password: string
}

export interface SignUpStep2FormData {
  company: string
  role: string
  industry: string
  phone: string
}

export interface SignUpFormsData extends SignUpStep1FormData, SignUpStep2FormData {}

export interface SignInFormData {
  email: string
  password: string
}
