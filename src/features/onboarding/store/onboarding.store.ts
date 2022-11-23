import { makeAutoObservable } from 'mobx'

import {
  SignInFormData,
  SignUpFormsData,
  SignUpStep1FormData,
  SignUpStep2FormData,
} from '../types/onboarding-forms.types'
import {
  amplifyConfirmSignUp,
  amplifyForgotPassword,
  amplifyForgotPasswordSubmit,
  amplifySignIn,
  amplifySignOut,
  amplifySignUp,
} from '../services/onboarding-api.service'

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
  wipSignUp: boolean = false
  wipConfirmSignUp: boolean = false
  wipSignIn: boolean = false
  wipForgotPassword: boolean = false
  wipForgotPasswordSubmit: boolean = false
  wipSignOut: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  private setWipSignUp(wip: boolean) {
    this.wipSignUp = wip
  }

  private setWipConfirmSignUp(wip: boolean) {
    this.wipConfirmSignUp = wip
  }

  private setWipSignIn(wip: boolean) {
    this.wipSignIn = wip
  }

  private setWipForgotPassword(wip: boolean) {
    this.wipForgotPassword = wip
  }

  private setWipForgotPasswordSubmit(wip: boolean) {
    this.wipForgotPasswordSubmit = wip
  }

  private setWipSignOut(wip: boolean) {
    this.wipSignOut = wip
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

  signUp = async (signUpFormsData: SignUpFormsData) => {
    try {
      this.setWipSignUp(true)

      await amplifySignUp(signUpFormsData)
    } catch (error) {
      throw error
    } finally {
      this.setWipSignUp(false)
    }
  }

  confirmSignUp = async (username: string, code: string) => {
    this.setWipConfirmSignUp(true)

    await amplifyConfirmSignUp(username, code)

    this.setWipConfirmSignUp(false)
  }

  signIn = async (signInFormData: SignInFormData) => {
    try {
      this.setWipSignIn(true)

      await amplifySignIn(signInFormData)
    } catch (error) {
      throw error
    } finally {
      this.setWipSignIn(false)
    }
  }

  forgotPassword = async (email: string) => {
    try {
      this.setWipForgotPassword(true)

      await amplifyForgotPassword(email)
    } catch (error) {
      throw error
    } finally {
      this.setWipForgotPassword(false)
    }
  }

  forgotPasswordSubmit = async (username: string, code: string, newPassword: string) => {
    try {
      this.setWipForgotPasswordSubmit(true)

      await amplifyForgotPasswordSubmit(username, code, newPassword)
    } catch (error) {
      throw error
    } finally {
      this.setWipForgotPasswordSubmit(false)
    }
  }

  signOut = async () => {
    try {
      this.setWipSignOut(true)

      await amplifySignOut()
    } catch (error) {
      throw error
    } finally {
      this.setWipSignOut(false)
    }
  }
}
