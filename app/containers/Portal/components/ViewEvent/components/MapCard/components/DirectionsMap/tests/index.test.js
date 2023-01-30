import { shallow } from 'enzyme';
import React from 'react';
import { GOOGLE_API_HELPERS } from 'smartComponents/Google/components/GoogleMap/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DirectionsMap } from '../index';

describe('<DirectionsMap />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const maps = {
    LatLngBounds: () => ({ extend: jest.fn() }),
    Marker: () => ({ extend: jest.fn() }),
  };
  const map = {
    fitBounds: jest.fn(),
    addListener: jest.fn((a, cb) => cb()),
  };
  const bounds = { extend: jest.fn(() => 'extend') };
  const boundsJSON = { toJSON: jest.fn(() => 'toJSON') };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<DirectionsMap {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DirectionsMap).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('updateMap()', () => {
    it('should wait !maps', () => {
      rendered.setState({ maps: null });

      expect(instance.updateMap()).toBe(null);
    });

    it('should wait !mapsReady', () => {
      rendered.setState({ maps: {}, mapsReady: null });

      expect(instance.updateMap()).toBe(null);
    });

    it('should not retry', () => {
      instance.retried = 10;
      rendered.setState({ maps: {}, mapsReady: null });

      expect(instance.updateMap()).toBe(null);
    });

    it('should handleUpdateMap', () => {
      instance.handleUpdateMap = jest.fn(() => 'handleUpdateMap');

      rendered.setState({ maps: {}, mapsReady: true });

      expect(instance.updateMap()).toBe('handleUpdateMap');
    });
  });

  describe('handleUpdateMap()', () => {
    it('should handleUpdateDirections', () => {
      instance.handleUpdateDirections = jest.fn();
      rendered.setProps({ direction: {} });

      instance.handleUpdateMap();

      TEST_HELPERS.expectCalled(instance.handleUpdateDirections);
    });

    it('should handleUpdateMarkers', () => {
      instance.handleUpdateMarkers = jest.fn();
      rendered.setProps({ start: {}, end: {} });

      instance.handleUpdateMap();

      TEST_HELPERS.expectCalled(instance.handleUpdateMarkers);
    });

    it('should handleUpdateSinglePlace', () => {
      instance.handleUpdateSinglePlace = jest.fn();
      rendered.setProps({ geocode: {} });

      instance.handleUpdateMap();

      TEST_HELPERS.expectCalled(instance.handleUpdateSinglePlace);
    });

    it('should return null', () => {
      expect(instance.handleUpdateMap()).toBe(null);
    });
  });

  describe('handleUpdateSinglePlace()', () => {
    it('should handleUpdateSinglePlace()', () => {
      rendered.setProps({ viewport: {} });
      instance.addMarker = jest.fn();
      instance.mapFitBounds = jest.fn();

      instance.handleUpdateSinglePlace();

      TEST_HELPERS.expectCalled(instance.addMarker);
      TEST_HELPERS.expectCalled(instance.mapFitBounds);
    });

    it('should not mapFitBounds', () => {
      instance.mapFitBounds = jest.fn();

      instance.handleUpdateSinglePlace();

      TEST_HELPERS.expectNotCalled(instance.mapFitBounds);
    });
  });

  describe('handleUpdateMarkers()', () => {
    it('should handleUpdateMarkers()', () => {
      rendered.setState({ maps });
      instance.addMarker = jest.fn();
      instance.mapFitBounds = jest.fn();
      ROUTE_HELPERS.generatePolylines = jest.fn();

      instance.handleUpdateMarkers();

      TEST_HELPERS.expectCalled(instance.addMarker);
      TEST_HELPERS.expectCalled(ROUTE_HELPERS.generatePolylines);
      TEST_HELPERS.expectCalled(instance.mapFitBounds);
    });
  });

  describe('handleUpdateDirections()', () => {
    it('should handleUpdateDirections()', () => {
      rendered.setProps({});
      instance.addMarker = jest.fn();
      instance.mapFitBounds = jest.fn();
      GOOGLE_API_HELPERS.normaliseData = jest.fn(() => ({}));
      GOOGLE_API_HELPERS.normaliseLegs = jest.fn(() => ({}));
      ROUTE_HELPERS.normalisePolylines = jest.fn();
      ROUTE_HELPERS.polylinesSetMap = jest.fn();

      instance.handleUpdateDirections();

      TEST_HELPERS.expectCalled(instance.addMarker);
      TEST_HELPERS.expectCalled(instance.mapFitBounds);
      TEST_HELPERS.expectCalled(ROUTE_HELPERS.polylinesSetMap);
    });
  });

  describe('addMarker()', () => {
    it('should return null', () => {
      rendered.setState({ maps: null });

      expect(instance.addMarker()).toBe(null);
    });

    it('should addMarker', () => {
      rendered.setState({ maps });

      expect(instance.addMarker()).not.toBe(null);
    });
  });

  describe('mapFitBounds()', () => {
    it('should return null() !map', () => {
      rendered.setState({ map: undefined });

      expect(instance.mapFitBounds()).toBe(null);
    });

    it('should return null() !bounds', () => {
      rendered.setState({ map });

      expect(instance.mapFitBounds()).toBe(null);
    });

    it('should return null() !blockBoundsChanged', () => {
      rendered.setState({ map, blockBoundsChanged: true });

      expect(instance.mapFitBounds(bounds)).toBe(null);
    });

    it('should mapFitBounds() bounds', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setState({ map });
      instance.padding = jest.fn(() => 'padding');

      instance.mapFitBounds(boundsJSON);

      TEST_HELPERS.expectCalled(map.fitBounds);
    });

    it('should mapFitBounds() bounds.toJSON', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setState({ map });
      instance.padding = jest.fn(() => 'padding');

      instance.mapFitBounds(bounds);

      TEST_HELPERS.expectCalled(map.fitBounds);
    });
  });

  describe('handleRef()', () => {
    it('should handleRef() !mapsReady', () => {
      instance.handleRef({ map, maps });

      expect(rendered.state().mapsReady).toBe(true);
    });

    it('should handleRef() mapsReady', () => {
      rendered.setState({ mapsReady: true, blockBoundsChanged: true });

      instance.handleRef({ map, maps });

      expect(rendered.state().boundsChanged).not.toBe(true);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setState({ mapKey: 'mapKey' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
