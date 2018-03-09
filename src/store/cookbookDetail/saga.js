import { actionChannel, put, select, takeEvery } from 'redux-saga/effects'

import { COOKBOOK_DETAIL_TYPES, saveCookbookSuccess } from './action'
import { cookbookDetailSelector } from '../../selector/cookbook'
import { cloneDeep, isEmpty } from 'lodash'
import { persistentLocalStore } from '../../lib/store'


function* handleSaveCookbook() {
  const detail = yield select(cookbookDetailSelector)

  const cookbook = cloneDeep(detail.cookbook)
  if (!isEmpty(detail.currentStepContent)) {
    cookbook.steps.push({ content: detail.currentStepContent })
  }
  try {
    yield persistentLocalStore.addCourse(cookbook)
    yield put(saveCookbookSuccess())
  } catch (error) {
    console.log('error :', error)
  }

}

export default function* cookbookDetailSaga() {
  yield takeEvery(yield actionChannel(COOKBOOK_DETAIL_TYPES.SAVE_COOKBOOK), handleSaveCookbook)
}
