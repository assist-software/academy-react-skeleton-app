import { nanoid } from 'nanoid'

import { GetItemsBasicFilters } from 'common/types/models.types'

export const addKeysToListItems = (list: any[]) => {
  const listWithKeys = list.map((item) => ({ ...item, key: nanoid() }))
  return listWithKeys
}

export const removeObjectKeys = (object: any, keysToRemove: string[]) => {
  return Object.keys(object)
    .filter((key) => !keysToRemove.includes(key))
    .reduce((filteredObject, key) => {
      filteredObject[key] = object[key]
      return filteredObject
    }, {} as any)
}

export const isFormikFormFieldInvalid = (formik: any, name: string): boolean => {
  return !!(formik.touched[name] && formik.errors[name])
}

export const getFormikFormFieldErrorMessage = (formik: any, name: string) => {
  return (
    isFormikFormFieldInvalid(formik, name) && (
      <small className='p-error'>{formik.errors[name]}</small>
    )
  )
}

export const generateFiltersQueryString = (filters: GetItemsBasicFilters): string => {
  return Object.entries(filters)
    .reduce((queryStringComponents, [filterName, filterValue]) => {
      return [
        ...queryStringComponents,
        `${encodeURIComponent(filterName)}=${encodeURIComponent(filterValue)}`,
      ]
    }, [] as string[])
    .join('&')
}
