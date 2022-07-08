import {combineReducers} from 'redux';
import {reduxBatch} from '@manaflair/redux-batch';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
// reducerStore
import {reducer as AppReducer} from 'store/app/Slices';
import {reducer as AuthReducer} from 'store/auth/Slices';
import {reducer as UserReducer} from 'store/user/Slices';
//saga
import {rootSaga} from 'store/rootSaga';

const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  user: UserReducer,
  // add here other reducers
});

//saga config
const sagaMiddleware = createSagaMiddleware();
const anyMiddlewares = [sagaMiddleware];
const middlewares = [...anyMiddlewares];

//store config
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: __DEV__,
  enhancers: enhancers => [reduxBatch, ...enhancers, reduxBatch],
});

sagaMiddleware.run(rootSaga);

export default store;
