import { createAction } from 'redux-actions';
import { persistentLocalStore } from '../../lib/store'

export const COOKBOOK_ACTION_TYPES = {
  GET_COOKBOOK_LIST: 'GET_COOKBOOK_LIST'
}

export const getCookbookList = createAction(COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST, (type) => {
  return { cookbook: persistentLocalStore.getCookbook(type) }
});
