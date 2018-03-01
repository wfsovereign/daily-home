import { handleActions } from "redux-actions";
import { COOKBOOK_ACTION_TYPES } from './action';

const defaultValue = {
  list:[]
}

export default handleActions({
    [COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST]: (state, action) => {
      console.log('state: ', state);
      console.log('action: ', action);
      return state
    }
  }
, defaultValue)
