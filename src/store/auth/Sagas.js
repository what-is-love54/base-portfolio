import {takeLatest, call, put, all} from 'redux-saga/effects';
//api
// import {signUp, logIn} from 'api/Auth';
//slices
import {loginStart, loginSuccess, loginError} from './Slices';
//utils
import {logError} from 'utils/Loger';
import deviceStorage from 'services/deviceStorage';

export default function* authRootSagas() {
  yield all([call(loginWatcher)]);
}

function* loginWatcher() {
  yield takeLatest(loginStart.toString(), loginWorker);
}

function* loginWorker() {
  try {
    // const res = yield call(logIn, payload.user);

    // log('res after login', res);
    const res = {
      token: 'dadfgdfna3453456;kqj3hr;kl3jr2weoirj345jqjo3be1ouyedbf',
    };

    yield call(deviceStorage.saveItem, 'token', res.token);
    yield put(loginSuccess(true));
  } catch (err) {
    yield put(loginError());
    logError('error after login', err);
  }
}
