import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import composed, { CACHE, withFindDetail } from '../index';

describe('withFindDetail', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withFindDetail(Component);

  const getDetails = jest.fn();
  const googleMaps = {
    places: {
      PlacesService: () => ({
        getDetails,
      }),
    },
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
    expect(withFindDetail).toBeDefined();
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

      TEST_HELPERS.expectDefined(instance.places);
    });

    it('should return null', () => {
      rendered.setProps({ googleMaps: null });

      expect(instance.initService()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ googleMaps: {} });

      expect(instance.initService()).toBe(null);
    });
  });

  describe('genKey()', () => {
    it('should genKey()', () => {
      expect(instance.genKey({ placeId: '112' })).toBe('112');
    });
  });

  describe('findDetailDebounce()', () => {
    it('should return null', () => {
      expect(instance.findDetailDebounce()).toBe(null);
    });

    it('should findDetailDebounce !debounced', () => {
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      instance.findDetailCallback = jest.fn(() => () => 112);

      expect(instance.findDetailDebounce({ placeId: 1 })).toBe(112);
    });

    it('should findDetailDebounce debounced cancel', () => {
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      const cancel = jest.fn();
      instance.debounced = { cancel };
      instance.findDetailCallback = jest.fn(() => () => 112);

      expect(instance.findDetailDebounce({ placeId: 1 })).toBe(112);
      TEST_HELPERS.expectCalled(cancel);
    });

    it('should findDetailDebounce !cache !debounced', () => {
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.findDetailCallback = jest.fn(() => () => 112);

      instance.findDetailDebounce({ placeId: 1 });

      TEST_HELPERS.expectNotCalled(instance.findDetailCallback);
    });

    it('should findDetailDebounce !cache debounced', () => {
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.debounced = jest.fn();
      instance.findDetailCallback = jest.fn(() => () => 112);

      instance.findDetailDebounce({ placeId: 1 });

      TEST_HELPERS.expectCalled(instance.debounced);
      TEST_HELPERS.expectNotCalled(instance.findDetailCallback);
    });
  });

  describe('findDetail()', () => {
    it('should findDetail()', () => {
      instance.findDetail();

      TEST_HELPERS.expectCalled(getDetails);
    });
  });

  describe('findDetailCallback()', () => {
    it('should findDetailCallback() !OK', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findDetailCallback(123, callback)({ id: 123 }, 'INVALID');

      expect(CACHE.key).toEqual({ id: 111 });
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findDetailCallback() !fromCache', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findDetailCallback(123, callback)({ id: 123 }, 'OK');

      expect(CACHE.key).toEqual([{ id: 123 }, 'OK']);
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findDetailCallback() fromCache', () => {
      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findDetailCallback(123, callback, true)({ id: 123 }, 'OK');

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
