import { AsyncStorage } from 'react-native'
import { cloneDeep, filter, find, findIndex, remove } from 'lodash'

const STORE_INSTANCE_KEYS = {
  COOKBOOK: 'COOKBOOK',
  CURRENT_COOKBOOK_INDEX: 'CURRENT_COOKBOOK_INDEX',
  LOGS: 'LOGS',
}

class PersistentLocalStore {

  constructor(store) {
    this.store = store
  }

  getCookbook = async (type) => {
    const allCookbook = await this.store.getItem(STORE_INSTANCE_KEYS.COOKBOOK) || JSON.stringify([])
    const allCookbookParsed = JSON.parse(allCookbook);
    if (!type) {
      return allCookbookParsed
    }

    return filter(allCookbookParsed, { type })
  }

  updateCookbook = async (cookbook) => {
    return await this.store.setItem(STORE_INSTANCE_KEYS.COOKBOOK, JSON.stringify(cookbook))
  }

  getCurrentCookbookIndex = async () => {
    const index = await this.store.getItem(STORE_INSTANCE_KEYS.CURRENT_COOKBOOK_INDEX) || '0';

    return parseInt(index, 10)
  }

  updateCurrentCookbookIndex = async (index) => {
    return await this.store.setItem(STORE_INSTANCE_KEYS.CURRENT_COOKBOOK_INDEX, index.toString())
  }

  getLogs = async () => {
    return await this.store.getItem(STORE_INSTANCE_KEYS.LOGS) || JSON.stringify([])
  }

  addCourse = async (course) => {
    const cookbook = await this.getCookbook()
    const currentCookbookIndex = await this.getCurrentCookbookIndex()
    const index = currentCookbookIndex + 1;
    course.id = index
    cookbook.push(course)
    await this.updateCurrentCookbookIndex(index)
    await this.updateCookbook(cookbook)
  }

  removeCourse = async (id) => {
    const cookbook = await this.getCookbook()
    const originalIndex = findIndex(cookbook, { id: course })
    const newCourse = cloneDeep(cookbook[originalIndex])
    newCourse.isDeleted = true
    cookbook[originalIndex] = newCourse

    await this.updateCookbook(cookbook)
  }

  updateCourse = async (course) => {
    const cookbook = await this.getCookbook()
    const originalIndex = findIndex(cookbook, { id: course })
    if (!originalIndex) {
      throw new Error('null course')
    }

    cookbook[originalIndex] = course
    await this.updateCookbook(cookbook)
  }
}

export const persistentLocalStore = new PersistentLocalStore(AsyncStorage)
