import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import composed, { CACHE, withFindRoute } from '../index';

describe('withFindRoute', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withFindRoute(Component);

  const route = jest.fn();
  const googleMaps = {
    DirectionsService: () => ({
      route,
    }),
  };

  const makeProps = () => ({
    resaga: {},
    googleMaps,
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withFindRoute).toBeDefined();
  });

  describe('componentWillMount()', () => {
    it('should componentWillMount()', () => {
      instance.initService = jest.fn(() => '');

      instance.componentWillMount();

      TEST_HELPERS.expectCalled(instance.initService);
    });
  });

  describe('initService()', () => {
    it('should initService()', () => {
      instance.initService();

      TEST_HELPERS.expectDefined(instance.directions);
    });

    it('should return null', () => {
      rendered.setProps({ googleMaps: null });

      expect(instance.initService()).toBe(null);
    });
  });

  describe('genKey()', () => {
    it('should genKey()', () => {
      expect(
        instance.genKey({
          origin: { placeId: '112' },
          destination: { placeId: '223' },
          travelMode: 'drive',
        }),
      ).toBe(`112___223___drive`);
    });
  });

  describe('validRequest()', () => {
    it('should validRequest()', () => {
      expect(
        instance.validRequest({
          origin: { placeId: '112' },
          destination: { placeId: '223' },
          travelMode: 'drive',
        }),
      ).toBe(true);
    });
  });

  describe('findRouteDebounce()', () => {
    it('should return null', () => {
      instance.validRequest = jest.fn(() => false);

      expect(instance.findRouteDebounce()).toBe(null);
    });

    it('should findRouteDebounce !debounced', () => {
      instance.validRequest = jest.fn(() => true);
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      instance.findRouteCallback = jest.fn(() => () => 112);

      expect(instance.findRouteDebounce({ placeId: 1 })).toBe(112);
    });

    it('should findRouteDebounce debounced cancel', () => {
      instance.validRequest = jest.fn(() => true);
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      const cancel = jest.fn();
      instance.debounced = { cancel };
      instance.findRouteCallback = jest.fn(() => () => 112);

      expect(instance.findRouteDebounce({ placeId: 1 })).toBe(112);
      TEST_HELPERS.expectCalled(cancel);
    });

    it('should findRouteDebounce !cache !debounced', () => {
      instance.validRequest = jest.fn(() => true);
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.findRouteCallback = jest.fn(() => () => 112);

      instance.findRouteDebounce({ placeId: 1 });

      TEST_HELPERS.expectNotCalled(instance.findRouteCallback);
    });

    it('should findRouteDebounce !cache debounced', () => {
      instance.validRequest = jest.fn(() => true);
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.debounced = jest.fn();
      instance.findRouteCallback = jest.fn(() => () => 112);

      instance.findRouteDebounce({ placeId: 1 });

      TEST_HELPERS.expectCalled(instance.debounced);
      TEST_HELPERS.expectNotCalled(instance.findRouteCallback);
    });
  });

  describe('findRoute()', () => {
    it('should findRoute()', () => {
      instance.findRoute();

      TEST_HELPERS.expectCalled(route);
    });
  });

  describe('findRouteCallback()', () => {
    it('should findRouteCallback() !OK', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findRouteCallback(123, callback)({ id: 123 }, 'INVALID');

      expect(CACHE.key).toEqual({ id: 111 });
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findRouteCallback() !fromCache', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findRouteCallback(123, callback)({ id: 123 }, 'OK');

      expect(CACHE.key).toEqual([{ id: 123 }, 'OK']);
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findRouteCallback() fromCache', () => {
      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findRouteCallback(123, callback, true)({ id: 123 }, 'OK');

      expect(CACHE.key).toEqual([{ id: 123 }, 'OK']);
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
