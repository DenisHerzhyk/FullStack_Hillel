import {put, delay, takeEvery, all} from 'redux-saga/effects'
import {increment, decrement, incrementAsync, decrementAsync, failedAsync} from "./counterSlice";

function* incrementSagas() {
    try {
        yield delay(1000)
        yield put(increment(1))
    }
    catch (error) {
        yield failedAsync("Increment failed");
    }
}

function* decrementSagas() {
    try {
        yield delay(1000)
        yield put(decrement(1))

    }
    catch (error) {
        yield failedAsync("Decrement failed");
    }
}

function* watchCounterSagas() {
    yield takeEvery(incrementAsync.type, incrementSagas);
    yield takeEvery(decrementAsync.type, decrementSagas);
}

export default function* rootSaga() {
    yield all([watchCounterSagas()]);
}