import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NOT_FOUND } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddRoute } from '../index';

describe('<AddRoute />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<AddRoute {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddRoute).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should set origin and destination', () => {
      rendered.setProps({ origin: 2, destination: 4, ids: [1, 2, 3, 4, 5] });

      instance.componentDidMount();

      expect(rendered.state().origin).toBe(2);
      expect(rendered.state().destination).toBe(4);
    });

    it('should set origin only', () => {
      rendered.setProps({ origin: 2, destination: 44, ids: [1, 2, 3, 4, 5] });

      instance.componentDidMount();

      expect(rendered.state().origin).toBe(2);
      expect(rendered.state().destination).toBe(undefined);
    });

    it('should set destination as origin', () => {
      rendered.setProps({
        origin: 22,
        destination: 4,
        ids: [1, 2, 3, 4, 5],
      });

      instance.componentDidMount();

      expect(rendered.state().origin).toBe(4);
      expect(rendered.state().destination).toBe(undefined);
    });
  });

  describe('changeRouteData()', () => {
    it('should changeRouteData()', () => {
      ROUTE_HELPERS.normaliseStops = jest.fn(() => 'normaliseStops');

      expect(instance.changeRouteData()).toBe('normaliseStops');

      TEST_HELPERS.expectCalled(ROUTE_HELPERS.normaliseStops);
    });
  });

  describe('handleCloseDialog()', () => {
    it('should handleCloseDialog()', () => {
      PORTAL_HELPERS.close = jest.fn(() => '');

      instance.handleCloseDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('confirmCancel()', () => {
    it('should handleCloseDialog', () => {
      rendered.setState({ origin: 0, destination: 0 });
      instance.handleCloseDialog = jest.fn();

      instance.confirmCancel();

      TEST_HELPERS.expectCalled(instance.handleCloseDialog);
    });

    it('should confirmCancelAddRoute', () => {
      rendered.setState({ origin: 2, destination: 4 });
      PORTAL_HELPERS.confirmCancelAddRoute = jest.fn();

      instance.confirmCancel();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmCancelAddRoute);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 2233 });
      NODE_API_HELPERS.updateNode = jest.fn();

      instance.handleValidSubmit({});

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.updateNode);
    });

    it('should handleValidSubmit', () => {
      rendered.setProps({ id: 0 });

      instance.handleValidSubmit({});

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('handleRouteNotFound()', () => {
    it('should handleRouteNotFound()', () => {
      instance.handleRouteNotFound({ origin: 1, destination: 3 }, NOT_FOUND);

      expect(rendered.state().routeFound).toBe(false);
      expect(rendered.state().routeNotFound).toBe(NOT_FOUND);
      expect(rendered.state().origin).toBe(1);
      expect(rendered.state().destination).toBe(3);
    });
  });

  describe('handleRef()', () => {
    it('should handleRef() idle', () => {
      const map = {
        addListener: jest.fn((prop, cb) => prop === 'idle' && cb()),
      };
      rendered.setState({ mapsReady: true });
      instance.handleRef({ map });
      rendered.setState({ mapsReady: false });
      instance.handleRef({ map });

      TEST_HELPERS.expectCalled(map.addListener);
    });

    it('should handleRef() bounds_changed', () => {
      const map = {
        addListener: jest.fn((prop, cb) => prop === 'bounds_changed' && cb()),
      };
      rendered.setState({ mapsReady: true });
      instance.handleRef({ map });
      rendered.setState({ mapsReady: false });
      instance.handleRef({ map });

      TEST_HELPERS.expectCalled(map.addListener);
    });
  });

  describe('fitBounds()', () => {
    it('should return null', () => {
      rendered.setState({ map: false });

      expect(instance.fitBounds()).toBe(null);
    });

    it('should fitBounds', () => {
      rendered.setState({
        map: {
          fitBounds: jest.fn(() => 'fitBounds'),
        },
        bounds: {},
      });

      expect(instance.fitBounds()).toBe('fitBounds');
    });
  });

  describe('handleChangeRoute()', () => {
    it('should handleChangeRoute()', () => {
      instance.fitBounds = jest.fn();
      ROUTE_HELPERS.polylinesSetMap = jest.fn();

      instance.handleChangeRoute({ markers: [] });

      TEST_HELPERS.expectCalled(ROUTE_HELPERS.polylinesSetMap);
      TEST_HELPERS.expectCalled(instance.fitBounds);
    });
  });

  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('routeIds()', () => {
    it('should routeIds()', () => {
      rendered.setProps({ ids: [1, 2, 3, 4, 5], origin: 2, destination: 4 });

      expect(instance.routeIds()).toEqual([2, 3, 4]);
    });
  });

  describe('renderResults', () => {
    it('should return if first condition', () => {
      rendered.setState({ routeNotFound: 'ZERO_RESULTS' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderResults);
    });
    it('should return if second condition', () => {
      rendered.setState({ routeNotFound: false, origin: 1, destination: 2 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderResults);
    });
    it('should return null', () => {
      rendered.setState({
        routeNotFound: false,
        origin: null,
        destination: null,
      });
      expect(instance.renderResults()).toEqual(null);
    });
  });

  describe('renderMarker()', () => {
    it('should renderMarker', () => {
      rendered.setProps({ ids: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMarker, [
        { id: 1, lat: 2, lng: 3 },
      ]);
    });
  });

  describe('renderRouteNotFound()', () => {
    it('should render NOT_FOUND', () => {
      rendered.setState({ routeNotFound: NOT_FOUND });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRouteNotFound);
    });

    it('should renderRouteNotFound', () => {
      rendered.setState({ routeNotFound: 'other' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRouteNotFound);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setState({
        routeFound: true,
        routeNotFound: true,
        markers: [1],
      });
      instance.renderRouteNotFound = jest.fn(() => 'renderRouteNotFound');
      instance.renderMarker = jest.fn(() => 'renderMarker');
      instance.renderResults = jest.fn(() => 'renderResults');
      instance.changeRouteData = jest.fn(() => 'changeRouteData');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
