import {
  select,
  call,
  put,
  take,
  fork,
  cancel,
  delay,
} from 'redux-saga/effects';
import { selectCurrentUserAccount } from 'datastore/stormPathStore/selectors';
import { types, actions } from '.';
import * as utils from './helpers/utils';

const WATCH_EVENT_SOURCE_INTERVAL_MS = 1000;
const INITIAL_CHANGE_STREAM_CHANNEL_BUFFER_SIZE = 10;

const EVENT_SOURCE_STATE_CLOSED = 2;

export function* watchEventSource(eventSource) {
  // eventSource.onopen = (...args) => { };
  // eventSource.onerror = (...args) => {};

  while (true) {
    yield delay(WATCH_EVENT_SOURCE_INTERVAL_MS);

    if (eventSource.readyState === EVENT_SOURCE_STATE_CLOSED) {
      yield put(actions.streamCancel());
    }
  }
}

export function* watchChangeStream() {
  const userAccount = yield select(selectCurrentUserAccount());
  const eventSource = yield utils.makeChangeStreamEventSource(userAccount);
  const channel = yield call(
    utils.makeChangeStreamChannel,
    eventSource,
    INITIAL_CHANGE_STREAM_CHANNEL_BUFFER_SIZE,
  );
  // console.log('Listening to realtime change stream', eventSource.url);

  try {
    yield fork(watchEventSource, eventSource);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const msg = yield take(channel);
      const change = yield utils.extractChange(msg);

      yield put(actions.streamEvent(change));
    }
  } catch (error) {
    yield put(actions.streamError(error));
  } finally {
    yield utils.cleanupChangeStreamChannel(channel);
  }
}

export function* saga() {
  while (true) {
    const task = yield fork(watchChangeStream);
    yield take(types.STREAM_CANCEL);
    yield cancel(task);
  }
}

export default [saga];
