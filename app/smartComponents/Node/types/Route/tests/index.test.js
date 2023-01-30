/* eslint-disable object-shorthand */
import { MAP_VIEW } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import upsertHelpers from 'utils/helpers/upsertStore';
import { Route } from '../index';

describe('<Route />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    clickId: 1,
    clickZoom: false,
  };

  const maps = {
    LatLngBounds: function() {
      return { extend: jest.fn() };
    },
  };
  const map = {
    fitBounds: jest.fn(),
    addListener: jest.fn((a, cb) => cb()),
  };
  const bounds = { extend: jest.fn(() => 'extend') };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Route {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Route).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidUpdate()', () => {
    it('should call if clickId changed', () => {
      instance.handleZoom = jest.fn();

      instance.componentDidUpdate({ clickId: 2 });

      TEST_HELPERS.expectCalled(instance.handleZoom);
    });

    it('should call if clickZoom changed', () => {
      instance.handleZoom = jest.fn();

      instance.componentDidUpdate({ clickZoom: true });

      TEST_HELPERS.expectCalled(instance.handleZoom);
    });

    it('should NOT call if nothing changed', () => {
      instance.handleZoom = jest.fn();

      instance.componentDidUpdate({ clickId: 1, clickZoom: false });

      TEST_HELPERS.expectNotCalled(instance.handleZoom);
    });
  });

  describe('handleZoom()', () => {
    it('should call zoomInNearestLocations', () => {
      instance.zoomInNearestLocations = jest.fn();
      rendered.setProps({ clickId: 1, markerIds: [1], clickZoom: true });

      instance.handleZoom();

      TEST_HELPERS.expectCalled(instance.zoomInNearestLocations);
    });

    it('should call fitBound', () => {
      instance.fitBound = jest.fn();
      rendered.setProps({ clickId: 1, markerIds: [1], clickZoom: false });

      instance.handleZoom();

      TEST_HELPERS.expectCalled(instance.fitBound);
    });

    it('should NOT call', () => {
      instance.zoomInNearestLocations = jest.fn();
      instance.fitBound = jest.fn();
      rendered.setProps({ clickId: 0 });

      instance.handleZoom();

      TEST_HELPERS.expectNotCalled(instance.zoomInNearestLocations);
      TEST_HELPERS.expectNotCalled(instance.fitBound);
    });
  });

  describe('handleClick()', () => {
    it('should call zoomInNearestLocations', () => {
      instance.zoomInNearestLocations = jest.fn();
      rendered.setProps({ clickId: 1, markerIds: [2] });

      instance.handleClick();

      TEST_HELPERS.expectCalled(instance.zoomInNearestLocations);
    });

    it('should call zoomIn', () => {
      instance.zoomIn = jest.fn();
      rendered.setProps({ clickId: 1, markerIds: [1], clickZoom: true });

      instance.handleClick();

      TEST_HELPERS.expectCalled(instance.zoomIn);
    });

    it('should NOT call', () => {
      instance.zoomInNearestLocations = jest.fn();
      instance.zoomIn = jest.fn();
      rendered.setProps({ clickId: 1, markerIds: [1], clickZoom: false });

      instance.handleClick();

      TEST_HELPERS.expectNotCalled(instance.zoomInNearestLocations);
      TEST_HELPERS.expectNotCalled(instance.zoomIn);
    });
  });

  describe('markerIdsWithClickId()', () => {
    it('should concat', () => {
      rendered.setProps({ clickId: 12 });

      expect(instance.markerIdsWithClickId([33], 12)).toEqual([33, 12]);
    });

    it('should concat #2', () => {
      rendered.setProps({ clickId: 12, markerIds: [1, 14] });

      expect(instance.markerIdsWithClickId([33], 14)).toEqual([33, 14]);
    });

    it('should NOT concat', () => {
      rendered.setProps({ clickId: 12, markerIds: [1, 2] });

      expect(instance.markerIdsWithClickId([33], 14)).toEqual([33]);
    });
  });

  describe('zoomInNearestLocations()', () => {
    it('should return null', () => {
      rendered.setState({ markers: [] });

      expect(instance.zoomInNearestLocations()).toBe(null);
    });

    const state = {
      markers: [{}, {}, {}, {}],
      maps,
    };
    const prop = {
      dayIds: [1, 2, 3, 4, 5, 6],
      markerIds: [3, 4, 5],
    };

    it('should zoomInNearestLocations first', () => {
      instance.extendBound = jest.fn();
      instance.fitBound = jest.fn();

      rendered.setState(state);
      rendered.setProps({
        ...prop,
        clickId: 3,
      });

      instance.zoomInNearestLocations();

      TEST_HELPERS.expectCalled(instance.extendBound);
      TEST_HELPERS.expectCalled(instance.fitBound);
    });

    it('should zoomInNearestLocations middle', () => {
      instance.extendBound = jest.fn();
      instance.fitBound = jest.fn();

      rendered.setState(state);
      rendered.setProps({
        ...prop,
        clickId: 4,
      });

      instance.zoomInNearestLocations();

      TEST_HELPERS.expectCalled(instance.extendBound);
      TEST_HELPERS.expectCalled(instance.fitBound);
    });

    it('should zoomInNearestLocations last', () => {
      instance.extendBound = jest.fn();
      instance.fitBound = jest.fn();

      rendered.setState(state);
      rendered.setProps({
        ...prop,
        clickId: 5,
      });

      instance.zoomInNearestLocations();

      TEST_HELPERS.expectCalled(instance.extendBound);
      TEST_HELPERS.expectCalled(instance.fitBound);
    });

    it('should zoomInNearestLocations location not set', () => {
      instance.extendBound = jest.fn();
      instance.fitBound = jest.fn();

      rendered.setState(state);
      rendered.setProps({
        ...prop,
        markerIds: [3, 5],
        clickId: 4,
      });

      instance.zoomInNearestLocations();

      TEST_HELPERS.expectCalled(instance.extendBound);
      TEST_HELPERS.expectCalled(instance.fitBound);
    });
  });

  describe('extendBound()', () => {
    it('should return null', () => {
      rendered.setProps({ markerIds: [1, 2, 3, 4] });
      rendered.setState({ markers: [{}] });

      expect(instance.extendBound(bounds, 2)).toBe(null);
    });

    it('should extendBound', () => {
      rendered.setProps({ markerIds: [1, 2, 3, 4] });
      rendered.setState({ markers: [{}] });

      expect(instance.extendBound(bounds, 1)).toBe('extend');
    });
  });

  describe('zoomIn()', () => {
    it('should fitCustomBounds()', () => {
      rendered.setProps({ clickId: 1, markerIds: [1, 2] });
      rendered.setState({ markers: [{}] });
      instance.fitCustomBounds = jest.fn();

      instance.zoomIn();

      TEST_HELPERS.expectCalled(instance.fitCustomBounds);
    });

    it('should NOT fitCustomBounds()', () => {
      rendered.setProps({ clickId: 2, markerIds: [1, 2] });
      rendered.setState({ markers: [{}] });
      instance.fitCustomBounds = jest.fn();

      instance.zoomIn();

      TEST_HELPERS.expectNotCalled(instance.fitCustomBounds);
    });

    it('should NOT fitCustomBounds() 2', () => {
      rendered.setProps({ clickId: 0 });
      instance.fitCustomBounds = jest.fn();

      instance.zoomIn();

      TEST_HELPERS.expectNotCalled(instance.fitCustomBounds);
    });
  });

  describe('padding()', () => {
    it('should return md', () => {
      rendered.setProps({ size: 'md' });

      TEST_HELPERS.expectMatchSnapshot(instance.padding);
    });

    it('should return other', () => {
      rendered.setProps({ size: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.padding);
    });
  });

  describe('fitBound()', () => {
    it('should return null()', () => {
      rendered.setState({ bounds: undefined });

      expect(instance.fitBound()).toBe(null);
    });

    it('should fitBound() bounds', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setState({ bounds, map });
      instance.padding = jest.fn(() => 'padding');

      instance.fitBound();

      TEST_HELPERS.expectCalled(map.fitBounds);
    });

    it('should fitBound() customBounds', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setState({ map });
      instance.padding = jest.fn(() => 'padding');

      instance.fitBound(bounds);

      TEST_HELPERS.expectCalled(map.fitBounds);
    });
  });

  describe('handleReCentre()', () => {
    it('should handleReCentre()', () => {
      instance.fitBound = jest.fn(() => '');

      instance.handleReCentre();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.fitBound);
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
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

  describe('fitCustomBounds()', () => {
    it('should fitCustomBounds() index 0', () => {
      rendered.setState({ maps, markers: [1, 2, 3] });
      instance.fitBound = jest.fn();

      instance.fitCustomBounds({ lat: 1, lng: 2 }, 0);

      TEST_HELPERS.expectCalled(instance.fitBound);
    });

    it('should fitCustomBounds() index > 0', () => {
      rendered.setState({ maps, markers: [1, 2, 3] });
      instance.fitBound = jest.fn();

      instance.fitCustomBounds({ lat: 1, lng: 2 }, 1);

      TEST_HELPERS.expectCalled(instance.fitBound);
    });

    it('should fitCustomBounds() index too big', () => {
      rendered.setState({ maps, markers: [1, 2, 3] });
      instance.fitBound = jest.fn();

      instance.fitCustomBounds({ lat: 1, lng: 2 }, 11);

      TEST_HELPERS.expectCalled(instance.fitBound);
    });
  });

  describe('handleSelectRoute()', () => {
    it('should handleSelectRoute', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.handleSelectRoute();

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('handleSeeRouteDetail()', () => {
    it('should handleSeeRouteDetail', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.handleSeeRouteDetail();

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('handleRouteFound()', () => {
    it('should return null', () => {
      rendered.setState({ maps: null });

      expect(instance.handleRouteFound()).toBe(null);
    });

    it('should handleRouteFound()', () => {
      rendered.setState({ maps });
      instance.handleChangeRoute = jest.fn();
      ROUTE_HELPERS.normaliseResult = jest.fn(() => ({}));
      upsertHelpers.deepMerge = jest.fn();

      instance.handleRouteFound();

      TEST_HELPERS.expectCalled(instance.handleChangeRoute);
    });
  });

  describe('handleChangeRoute()', () => {
    it('should return null', () => {
      rendered.setState({ map: null });

      expect(instance.handleChangeRoute({})).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setState({ map });

      expect(instance.handleChangeRoute({ markers: [] })).toBe(null);
    });

    it('should call polylinesSetMap', () => {
      ROUTE_HELPERS.polylinesSetMap = jest.fn();
      rendered.setState({ map });

      instance.handleChangeRoute({ markers: [1] });

      TEST_HELPERS.expectCalled(ROUTE_HELPERS.polylinesSetMap);
    });
  });

  describe('openChangeRoute()', () => {
    it('should openChangeRoute()', () => {
      PORTAL_HELPERS.openAddRoute = jest.fn();

      instance.openChangeRoute();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddRoute);
    });
  });

  describe('renderMarker()', () => {
    it('should return null', () => {
      rendered.setProps({
        variant: 'not MAP_VIEW',
        origin: 11,
        destination: 14,
      });

      expect(instance.renderMarker({ id: 12 })).toBe(null);
    });

    it('should renderMarker', () => {
      rendered.setProps({ variant: MAP_VIEW, origin: 11, destination: 14 });

      expect(instance.renderMarker({ id: 12 })).not.toBe(null);
    });
  });

  describe('renderMapView()', () => {
    it('should renderMapView', () => {
      instance.renderMarker = jest.fn(() => 'renderMarker');
      rendered.setState({ mapsReady: true, boundsChanged: true });
      rendered.setProps({ originIndex: 1, destinationIndex: 4, size: 'md' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMapView());
    });

    it('should renderMapView !validRoute', () => {
      rendered.setState({ mapsReady: true, boundsChanged: false });
      rendered.setProps({ originIndex: -1, destinationIndex: 4 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMapView());
    });
  });

  describe('renderRouteContent()', () => {
    it('should renderRouteContent', () => {
      rendered.setProps({ showIndex: true, active: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRouteContent());
    });
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      instance.renderMapView = jest.fn();
      instance.renderRouteContent = jest.fn();

      TEST_HELPERS.expectMatchSnapshot(instance.renderCard());
    });
  });

  describe('renderSelectRoute()', () => {
    it('should renderSelectRoute', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelectRoute());
    });
  });

  describe('renderRouteDetails()', () => {
    it('should renderRouteDetails', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRouteDetails());
    });
  });

  describe('renderRouteCard()', () => {
    it('should renderRouteCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRouteCard());
    });
  });

  describe('render()', () => {
    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');
    });
  });
});
