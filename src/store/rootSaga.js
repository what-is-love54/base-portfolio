import {all, call} from 'redux-saga/effects';
import authFlowSagas from 'store/auth/Sagas';
import userFlowSagas from 'store/user/Sagas';
//utils
import {log} from 'utils/Loger';

export function* rootSaga() {
  log('Root Saga Run');
  yield all([call(authFlowSagas), call(userFlowSagas)]);
}
