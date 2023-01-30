import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import timeZoneHelpers from 'utils/helpers/timeZone';
import composed, { CACHE, withFindTimeZone } from '../index';

describe('withFindTimeZone', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withFindTimeZone(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withFindTimeZone).toBeDefined();
  });

  describe('genKey()', () => {
    it('should genKey()', () => {
      expect(instance.genKey({ latitude: 1, longitude: 2, timestamp: 3 })).toBe(
        '1,2,3',
      );
    });
  });

  describe('findTimeZoneDebounce()', () => {
    it('should return null', () => {
      expect(instance.findTimeZoneDebounce({ latitude: 1 })).toBe(null);
      expect(instance.findTimeZoneDebounce({ longitude: 2 })).toBe(null);
    });

    it('should findTimeZoneDebounce !debounced', () => {
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      instance.findTimeZoneCallback = jest.fn(() => () => 112);

      expect(instance.findTimeZoneDebounce({ latitude: 1, longitude: 2 })).toBe(
        112,
      );
    });

    it('should findTimeZoneDebounce debounced cancel', () => {
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      const cancel = jest.fn();
      instance.debounced = { cancel };
      instance.findTimeZoneCallback = jest.fn(() => () => 112);

      expect(instance.findTimeZoneDebounce({ latitude: 1, longitude: 2 })).toBe(
        112,
      );
      TEST_HELPERS.expectCalled(cancel);
    });

    it('should findTimeZoneDebounce !cache !debounced', () => {
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.findTimeZoneCallback = jest.fn(() => () => 112);

      instance.findTimeZoneDebounce({ latitude: 1, longitude: 2 });

      TEST_HELPERS.expectNotCalled(instance.findTimeZoneCallback);
    });

    it('should findTimeZoneDebounce !cache debounced', () => {
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.debounced = jest.fn();
      instance.findTimeZoneCallback = jest.fn(() => () => 112);

      instance.findTimeZoneDebounce({ latitude: 1, longitude: 2 });

      TEST_HELPERS.expectCalled(instance.debounced);
      TEST_HELPERS.expectNotCalled(instance.findTimeZoneCallback);
    });
  });

  describe('findTimeZone()', () => {
    it('should findTimeZone()', () => {
      timeZoneHelpers.fetchTimeZone = jest.fn();

      instance.findTimeZone();

      TEST_HELPERS.expectCalled(timeZoneHelpers.fetchTimeZone);
    });
  });

  describe('findTimeZoneCallback()', () => {
    it('should findTimeZoneCallback() !OK', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findTimeZoneCallback(123, callback)({ id: 123 }, 'INVALID');

      expect(CACHE.key).toEqual({ id: 111 });
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findTimeZoneCallback() !fromCache', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findTimeZoneCallback(123, callback)(null, { status: 'OK' });

      expect(CACHE.key).toEqual([null, { status: 'OK' }]);
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findTimeZoneCallback() fromCache', () => {
      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findTimeZoneCallback(123, callback, true)(null, {
        status: 'OK',
      });

      expect(CACHE.key).toEqual([null, { status: 'OK' }]);
      TEST_HELPERS.expectCalled(callback);
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composed(Component)).toBeDefined();
    });
  });
});
