import { handleActions } from "redux-actions";
import { COOKBOOK_ACTION_TYPES } from './action';


export default handleActions({
  [COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST]: () => {}
}, {})
