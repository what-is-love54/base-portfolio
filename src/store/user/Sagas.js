import {all, call, takeLatest, put} from 'redux-saga/effects';
// import {getUser} from 'api/User';
import {setUserNameStart, setUserNameSuccess, setUserNameError} from './Slices';
// utils
import {log, logError} from 'utils/Loger';

export default function* userRootSagas() {
  yield all([call(getUserWatcher)]);
}

function* getUserWatcher() {
  yield takeLatest(setUserNameStart.toString(), getUserWorker);
}

function* getUserWorker() {
  try {
    // const response = yield call(getUser);
    const response = 'Vladyslav';

    log('res after getUser', response);
    yield put(setUserNameSuccess(response));
  } catch (err) {
    logError('error after getUser', err);
    yield put(setUserNameError());
  }
}
