import { all, fork } from 'redux-saga/effects'

import cookbookSaga from './cookbook/saga'
import cookbookDetailSaga from './cookbookDetail/saga'

export default function* rootSaga() {
  yield all(
    [
      fork(cookbookSaga),
      fork(cookbookDetailSaga),
    ]
  )
}
