import { nanoid } from 'nanoid'

const addKeysToListItems = (list: any[]) => {
  const listWithKeys = list.map((item) => ({ ...item, key: nanoid() }))
  return listWithKeys
}

export const UtilService = {
  addKeysToListItems,
}
