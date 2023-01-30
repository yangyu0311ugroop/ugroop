import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import composed, { CACHE, withPlacesAutocomplete } from '../index';

class LatLng {
  constructor(geocode) {
    this.geocode = geocode;
  }
}

describe('withPlacesAutocomplete', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withPlacesAutocomplete(Component);

  const getPlacePredictions = jest.fn();
  const googleMaps = {
    places: {
      AutocompleteService: () => ({
        getPlacePredictions,
      }),
    },
    LatLng,
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
    expect(withPlacesAutocomplete).toBeDefined();
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

      TEST_HELPERS.expectDefined(instance.autoComplete);
      expect(instance.LatLng).toBeDefined();
    });
  });

  describe('genKey()', () => {
    it('should genKey()', () => {
      expect(instance.genKey({ input: ' test ', types: [1, 2] })).toBe(
        'test__1,2',
      );
      expect(instance.genKey({})).toBe('__undefined');
    });
  });

  describe('findPlacesDebounce()', () => {
    it('should return null', () => {
      expect(instance.findPlacesDebounce()).toBe(null);
    });

    it('should findPlacesDebounce !debounced', () => {
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      instance.findPlacesCallback = jest.fn(() => () => 112);

      expect(instance.findPlacesDebounce({ input: 1 })).toBe(112);
    });

    it('should findPlacesDebounce debounced cancel', () => {
      instance.genKey = jest.fn(() => 'key');
      CACHE.key = [1, 2];
      const cancel = jest.fn();
      instance.debounced = { cancel };
      instance.findPlacesCallback = jest.fn(() => () => 112);

      expect(instance.findPlacesDebounce({ input: 1 })).toBe(112);
      TEST_HELPERS.expectCalled(cancel);
    });

    it('should findPlacesDebounce !cache !debounced', () => {
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.findPlacesCallback = jest.fn(() => () => 112);

      instance.findPlacesDebounce({ input: 1 });

      TEST_HELPERS.expectNotCalled(instance.findPlacesCallback);
    });

    it('should findPlacesDebounce !cache debounced', () => {
      instance.genKey = jest.fn(() => 'key112');
      CACHE.key = [1, 2];
      instance.debounced = jest.fn();
      instance.findPlacesCallback = jest.fn(() => () => 112);

      instance.findPlacesDebounce({ input: 1 });

      TEST_HELPERS.expectCalled(instance.debounced);
      TEST_HELPERS.expectNotCalled(instance.findPlacesCallback);
    });
  });

  describe('findPlaces()', () => {
    it('should findPlaces()', () => {
      instance.findPlaces();

      TEST_HELPERS.expectCalled(getPlacePredictions);
    });

    it('should findPlaces() with location', () => {
      instance.findPlaces({ location: [1, 2] });

      TEST_HELPERS.expectCalled(getPlacePredictions);
    });
  });

  describe('findPlacesCallback()', () => {
    it('should findPlacesCallback() !OK', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findPlacesCallback(123, callback)({ id: 123 }, 'INVALID');

      expect(CACHE.key).toEqual({ id: 111 });
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findPlacesCallback() !fromCache', () => {
      CACHE.key = { id: 111 };

      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findPlacesCallback(123, callback)({ id: 123 }, 'OK');

      expect(CACHE.key).toEqual([{ id: 123 }, 'OK']);
      TEST_HELPERS.expectCalled(callback);
    });

    it('should findPlacesCallback() fromCache', () => {
      const callback = jest.fn();
      instance.genKey = jest.fn(() => 'key');

      instance.findPlacesCallback(123, callback, true)({ id: 123 }, 'OK');

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
