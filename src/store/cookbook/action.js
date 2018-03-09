import { createAction } from 'redux-actions';

export const COOKBOOK_ACTION_TYPES = {
  GET_COOKBOOK_LIST: 'GET_COOKBOOK_LIST',
  GET_COOKBOOK_LIST_SUCCESS: 'GET_COOKBOOK_LIST_SUCCESS'
}

export const getCookbookList = createAction(COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST, (type) => ({ type }))

export const getCookbookListSuccess = createAction(COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST_SUCCESS, (payload) => payload)
