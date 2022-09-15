import { nanoid } from 'nanoid'

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
