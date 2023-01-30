import { Iterable } from 'immutable';
import * as utils from '../utils';

describe('datastore/realtimeStore/helpers/utils', () => {
  const MockEventSource = class EventSource {
    constructor(url) {
      this.url = url;
      this.dataListeners = [];
    }

    close() {}

    addEventListener(event, handler) {
      if (event === 'data') {
        this.dataListeners = [...this.dataListeners, handler];
      }
    }

    removeEventListener() {}
  };
  global.EventSource = MockEventSource;

  describe('#makeChangeStreamEventSource()', () => {
    let prevAccountBaseUrl;

    beforeEach(() => {
      prevAccountBaseUrl = process.env.ACCOUNT_BASE_URL;
      process.env.ACCOUNT_BASE_URL = 'http://server.com';
    });
    afterEach(() => {
      process.env.ACCOUNT_BASE_URL = prevAccountBaseUrl;
    });

    it('creates EventSource with correct url', () => {
      const mockUserAccount = { customData: { userId: 1 } };
      const result = utils.makeChangeStreamEventSource(mockUserAccount);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#makeChangeStreamChannel()', () => {
    it('creates EventChannel', () => {
      const mockEventSource = new EventSource('testUrl');
      const result = utils.makeChangeStreamChannel(mockEventSource);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#changeStreamChannelHandler()', () => {
    it("adds 'data' event listener and returns cleanup callback which closes event source", () => {
      const mockEventSource = new EventSource('testUrl');
      const mockEmitter = jest.fn();
      const cleanupCallback = utils.changeStreamChannelHandler(
        mockEmitter,
        mockEventSource,
      );
      expect(mockEventSource.dataListeners.length).toEqual(1);

      const mockMsg = 'test message';
      mockEventSource.dataListeners[0](mockMsg);
      expect(mockEmitter).toHaveBeenCalledWith(mockMsg);

      const eventSourceCloseSpy = jest.spyOn(mockEventSource, 'close');
      const eventSourceRemoveEventListenerSpy = jest.spyOn(
        mockEventSource,
        'removeEventListener',
      );
      cleanupCallback();
      expect(eventSourceRemoveEventListenerSpy).toBeCalledWith(
        'data',
        mockEmitter,
      );
      expect(eventSourceCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#cleanupChangeStreamChannel()', () => {
    it('closes channel', () => {
      const mockChannel = {
        close() {},
      };
      const channelCloseSpy = jest.spyOn(mockChannel, 'close');
      utils.cleanupChangeStreamChannel(mockChannel);
      expect(channelCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#extractChange()', () => {
    it('extracts immutable change from message', () => {
      const mockChange = { test: 'mockChange' };
      const mockMsg = {
        data: JSON.stringify({ data: { change: JSON.stringify(mockChange) } }),
      };
      const result = utils.extractChange(mockMsg);
      expect(Iterable.isIterable(result)).toBeTruthy();
      expect(result.toJS()).toEqual(mockChange);
    });
  });
});
