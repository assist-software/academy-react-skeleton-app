import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { getAuthIdToken } from './auth.service'
import { amplifySignOut } from 'features/onboarding/services/onboarding-api.service'

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const idToken = getAuthIdToken()
  const customHeaders = {
    ...config.headers,
    Authorization: `Bearer ${idToken}`,
  }
  const customConfig = { ...config, headers: customHeaders }
  return customConfig
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const status = error.response?.status
  if (status === undefined || status === 401 || status === 403) {
    try {
      await amplifySignOut()
    } catch (error) {
    } finally {
      window.location.href = '/sign-in'
    }
  }
  return Promise.reject(error)
}

export const setInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
