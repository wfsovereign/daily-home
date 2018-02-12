import { AsyncStorage } from 'react-native'
import { cloneDeep, findIndex, remove, find } from 'lodash'

const STORE_INSTANCE_KEYS = {
  COOKBOOK: 'COOKBOOK',
  CURRENT_COOKBOOK_INDEX: 'CURRENT_COOKBOOK_INDEX',
  LOGS: 'LOGS',
}

class PersistentLocalStore {

  constructor(store) {
    this.store = store
  }

  getCookbook = (type) => {
    const allCookbook = this.store.getItem(STORE_INSTANCE_KEYS.COOKBOOK) || []
    if (!type) {
      return allCookbook
    }

    return find(allCookbook, {type})
  }

  updateCookbook = (cookbook) => {
    return this.store.setItem(STORE_INSTANCE_KEYS.COOKBOOK, cookbook)
  }

  getCurrentCookbookIndex = () => {
    return this.store.getItem(STORE_INSTANCE_KEYS.CURRENT_COOKBOOK_INDEX) || 0
  }

  updateCurrentCookbookIndex = (index) => {
    return this.store.getItem(STORE_INSTANCE_KEYS.CURRENT_COOKBOOK_INDEX) || 0
  }

  getLogs = () => {
    return this.store.getItem(STORE_INSTANCE_KEYS.LOGS) || []
  }

  addCourse = async (course) => {
    const cookbook = await this.getCookbook()
    const currentCookbookIndex = await this.getCurrentCookbookIndex()
    course.id = currentCookbookIndex + 1
    cookbook.push(course)
    await this.updateCurrentCookbookIndex(currentCookbookIndex)
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
