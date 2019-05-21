import { all } from 'redux-saga/effects';
import { todoRequestsSagas } from "./todoRequestsSagas";


function* allSagas() {
  yield all([
    ...todoRequestsSagas
  ]);
}

export const rootSaga = allSagas;
