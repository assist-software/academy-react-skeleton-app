import { nanoid } from 'nanoid'

const addKeysToListItems = (list: any[]) => {
  const listWithKeys = list.map((item) => ({ ...item, key: nanoid() }))
  return listWithKeys
}

const getRandomInt = ({ min, max }: { min: number; max: number }) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const UtilService = {
  addKeysToListItems,
  getRandomInt,
}
