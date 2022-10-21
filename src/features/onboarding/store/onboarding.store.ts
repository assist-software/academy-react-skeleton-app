import { makeAutoObservable } from 'mobx'

import { SignUpStep1FormData, SignUpStep2FormData } from '../types/onboarding-forms.types'

export class OnboardingStore {
  signUpstep1FormData: SignUpStep1FormData = {
    name: '',
    email: '',
    password: '',
  }

  signUpstep2FormData: SignUpStep2FormData = {
    company: '',
    role: '',
    industry: '',
    phone: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  setSignUpStep1FormData = (signUpstep1FormData: SignUpStep1FormData) => {
    this.signUpstep1FormData = signUpstep1FormData
  }

  setSignUpStep2FormData = (signUpstep2FormData: SignUpStep2FormData) => {
    this.signUpstep2FormData = signUpstep2FormData
  }

  resetFormsData = () => {
    this.signUpstep1FormData = {
      name: '',
      email: '',
      password: '',
    }

    this.signUpstep2FormData = {
      company: '',
      role: '',
      industry: '',
      phone: '',
    }
  }
}
