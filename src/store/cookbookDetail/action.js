import { createAction } from 'redux-actions';


export const COOKBOOK_DETAIL_TYPES = {
  UPDATE_CURRENT_STEP: 'UPDATE_CURRENT_STEP',
  ADD_STEP: 'ADD_STEP',
  UPDATE_COOKBOOK_DETAIL: 'UPDATE_COOKBOOK_DETAIL',
  REMOVE_PRE_STEP: 'REMOVE_PRE_STEP',
  SAVE_COOKBOOK: 'SAVE_COOKBOOK',
  SAVE_COOKBOOK_SUCCESS: 'SAVE_COOKBOOK_SUCCESS',
}

export const updateCurrentStep = createAction(COOKBOOK_DETAIL_TYPES.UPDATE_CURRENT_STEP, (content) => ({content}))

export const addStep = createAction(COOKBOOK_DETAIL_TYPES.ADD_STEP, () => ({}))

export const removePreStep = createAction(COOKBOOK_DETAIL_TYPES.REMOVE_PRE_STEP, () => ({}))

export const updateCookbookDetail = createAction(COOKBOOK_DETAIL_TYPES.UPDATE_COOKBOOK_DETAIL, (content) => content)

export const saveCookbook = createAction(COOKBOOK_DETAIL_TYPES.SAVE_COOKBOOK, () => ({}))

export const saveCookbookSuccess = createAction(COOKBOOK_DETAIL_TYPES.SAVE_COOKBOOK_SUCCESS, () => ({}))
