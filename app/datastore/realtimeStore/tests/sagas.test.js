/* eslint-disable redux-saga/yield-effects */
import { createMockTask } from '@redux-saga/testing-utils';
import { call, take, put, fork, cancel } from 'redux-saga/effects';
import { stdChannel } from 'redux-saga';
import * as utils from '../helpers/utils';
import { watchChangeStream, saga, watchEventSource } from '../sagas';
import { types, actions } from '..';

// TODO: End-to-end test for whether the saga's EventSource receives deltas for current username only

describe('datastore/realtimeStore/sagas', () => {
  describe('#watchEventSource()', () => {
    let gen;

    const MockEventSource = class EventSource {
      readyState = 0;
    };
    const mockEventSource = new MockEventSource();

    beforeEach(() => {
      gen = watchEventSource(mockEventSource);
    });

    it('has correct flow', () => {
      const delayDescripter = gen.next().value;
      expect(delayDescripter).toMatchSnapshot();

      const delayDescripter2 = gen.next().value;
      expect(delayDescripter2).toMatchSnapshot();

      mockEventSource.readyState = 2;

      const putDescriptor = gen.next().value;
      expect(putDescriptor).toEqual(put(actions.streamCancel()));

      const delayDescripter3 = gen.next().value;
      expect(delayDescripter3).toMatchSnapshot();
    });
  });

  describe('#watchChangeStream()', () => {
    let gen;

    const MockEventSource = class EventSource {
      constructor(url) {
        this.url = url;
      }
    };
    global.EventSource = MockEventSource;

    let prevAccountBaseUrl;

    const mockChannel = stdChannel();

    beforeEach(() => {
      prevAccountBaseUrl = process.env.ACCOUNT_BASE_URL;
      process.env.ACCOUNT_BASE_URL = 'http://server.com';

      gen = watchChangeStream();

      const selectAccountDescriptor = gen.next().value;
      // SK: Using toMatchSnapshot() because toEqual(select(selectCurrentUserAccount())) fails despite being equal
      expect(selectAccountDescriptor).toMatchSnapshot();

      const mockUserAccount = { customData: { userId: 1 } };
      const mockEventSource = gen.next(mockUserAccount).value; // make event source util

      const callMakeChannelDescriptor = gen.next(mockEventSource).value;
      expect(callMakeChannelDescriptor).toEqual(
        call(utils.makeChangeStreamChannel, mockEventSource, 10),
      );

      const forkWatchEventSourceDescriptor = gen.next(mockChannel).value;
      expect(forkWatchEventSourceDescriptor).toEqual(
        fork(watchEventSource, mockEventSource),
      );
    });
    afterEach(() => {
      process.env.ACCOUNT_BASE_URL = prevAccountBaseUrl;
    });

    it('puts actions.streamEvent() repeatedly', () => {
      const infiniteLoopTestCount = 3;
      for (let i = 0; i < infiniteLoopTestCount; i += 1) {
        const takeChannelDescriptor = gen.next().value;
        expect(takeChannelDescriptor).toEqual(take(mockChannel));

        let mockChange = { test: 'mockChange' };
        const mockMsg = {
          data: JSON.stringify({
            data: { change: JSON.stringify(mockChange) },
          }),
        };
        mockChange = gen.next(mockMsg); // extract change util

        const putActionDescriptor = gen.next(mockChange).value;
        expect(putActionDescriptor).toEqual(
          put(actions.streamEvent(mockChange)),
        );
      }
    });
    it('catches errors during take/put loop and puts actions.streamError()', () => {
      const takeChannelDescriptor = gen.next().value;
      expect(takeChannelDescriptor).toEqual(take(mockChannel));

      const mockError = new Error('some error');
      const putErrorDescriptor = gen.throw(mockError).value;
      expect(putErrorDescriptor).toEqual(put(actions.streamError(mockError)));

      const cleanupResult = gen.next().value;
      expect(cleanupResult).toEqual(
        utils.cleanupChangeStreamChannel(mockChannel),
      );
    });
  });

  describe('#saga()', () => {
    let gen;

    beforeEach(() => {
      gen = saga();
    });

    it('has correct flow', () => {
      const forkDescriptor = gen.next().value;
      expect(forkDescriptor).toEqual(fork(watchChangeStream));

      const mockTask = createMockTask();

      const takeDescriptor = gen.next(mockTask).value;
      expect(takeDescriptor).toEqual(take(types.STREAM_CANCEL));

      const cancelDescriptor = gen.next().value;
      expect(cancelDescriptor).toEqual(cancel(mockTask));

      const forkDescriptor2 = gen.next().value;
      expect(forkDescriptor2).toEqual(fork(watchChangeStream));
    });
  });
});
