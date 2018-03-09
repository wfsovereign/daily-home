import { actionChannel, call, put, takeEvery } from 'redux-saga/effects'
import { get } from 'lodash'
import { persistentLocalStore } from '../../lib/store'
import { COOKBOOK_ACTION_TYPES, getCookbookListSuccess } from './action';

function* handleGetCookbookList(action) {
  const type = action.payload.type
  const list = yield (call(persistentLocalStore.getCookbook, type))
  yield put(getCookbookListSuccess(list))
}

export default function* cookbookSaga() {
  yield takeEvery(yield actionChannel(COOKBOOK_ACTION_TYPES.GET_COOKBOOK_LIST), handleGetCookbookList)
}
