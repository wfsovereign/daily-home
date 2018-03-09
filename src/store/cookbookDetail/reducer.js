import { handleActions } from 'redux-actions';
import { cloneDeep, isEmpty } from 'lodash'
import { COOKBOOK_DETAIL_TYPES } from './action';
import { COOKBOOK_TYPES } from '../../constants/cookbook';

const defaultValue = {
  cookbook: {
    name: '',
    type: COOKBOOK_TYPES.BREAKFAST,
    steps: [],
    notes: '',
    imageSource: { uri: '' },
  },
  currentStepContent: '',
}

export default handleActions({
  [COOKBOOK_DETAIL_TYPES.UPDATE_CURRENT_STEP]: (state, action) => {
    const { content } = action.payload
    console.log('action.payload :', action.payload);
    return {
      ...state,
      currentStepContent: content,
    }
  },
  [COOKBOOK_DETAIL_TYPES.ADD_STEP]: (state) => {
    state.cookbook.steps.push({ content: state.currentStepContent })
    return {
      ...state,
      currentStepContent: '',
    }
  },
  [COOKBOOK_DETAIL_TYPES.UPDATE_COOKBOOK_DETAIL]: (state, action) => {
    const { payload } = action
    console.log('payload :', payload);
    const result = Object.assign(state.cookbook, payload)
    console.log('result :', result);
    return {
      ...state,
      cookbook: Object.assign(state.cookbook, payload)
    }
  },
  [COOKBOOK_DETAIL_TYPES.SAVE_COOKBOOK_SUCCESS]: () => Object.assign({}, defaultValue),
}, defaultValue)
