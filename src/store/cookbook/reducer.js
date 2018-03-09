import { handleActions } from "redux-actions"
import { COOKBOOK_ACTION_TYPES } from './action'

const defaultValue = {
  list: []
}

export default handleActions({
  [COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST_SUCCESS]: (state, action) => {
    const list = action.payload
    return Object.assign({}, state, { list })
  }
}, defaultValue)
