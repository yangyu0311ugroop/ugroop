import { NOT_FOUND, ZERO_RESULTS } from 'appConstants';
import dotProp from 'dot-prop-immutable';
import { shallow } from 'enzyme';
import React from 'react';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CalculatedRoute } from '../index';
import { ROUTE_CACHE } from '../helpers';

describe('<CalculatedRoute />', () => {
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

    rendered = shallow(<CalculatedRoute {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CalculatedRoute).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      instance.updateCalculatedRoute = jest.fn(() => '');

      instance.componentDidMount();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.updateCalculatedRoute);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call updateCalculatedRoute()', () => {
      rendered.setProps({ placeIds: [1] });
      instance.updateCalculatedRoute = jest.fn(() => '');

      instance.componentWillReceiveProps({ placeIds: [2] });

      TEST_HELPERS.expectCalled(instance.updateCalculatedRoute);
    });

    it('should call delete()', () => {
      rendered.setProps({ placeIds: [1], reload: 1 });
      ROUTE_CACHE.delete = jest.fn(() => '');

      instance.componentWillReceiveProps({ placeIds: [1], reload: 2 });

      TEST_HELPERS.expectCalled(ROUTE_CACHE.delete);
    });
  });

  describe('updateCalculatedRoute()', () => {
    it('should return null', () => {
      expect(
        instance.updateCalculatedRoute({
          placeIds: [],
        }),
      ).toBe(null);
    });

    it('placeIds changed', () => {
      instance.findRoute = jest.fn();

      instance.updateCalculatedRoute({
        placeIds: [1],
        currentPlaceIds: [1, 2],
      });

      TEST_HELPERS.expectCalled(instance.findRoute);
    });

    it('cache not exist', () => {
      instance.findRoute = jest.fn();

      instance.updateCalculatedRoute({
        placeIds: [1],
        currentPlaceIds: [1],
        id: 2233,
      });

      TEST_HELPERS.expectCalled(instance.findRoute);
    });

    it('invalid cache', () => {
      ROUTE_CACHE.get = jest.fn(() => ({}));
      ROUTE_CACHE.isValid = jest.fn(() => false);
      instance.findRoute = jest.fn();

      instance.updateCalculatedRoute({
        placeIds: [1],
        currentPlaceIds: [1],
        id: 2233,
      });

      TEST_HELPERS.expectCalled(instance.findRoute);
    });

    it('return cache', () => {
      ROUTE_CACHE.get = jest.fn(() => ({}));
      ROUTE_CACHE.isValid = jest.fn(() => true);
      instance.findRoute = jest.fn();
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.updateCalculatedRoute({
        placeIds: [1],
        currentPlaceIds: [1],
        id: 3344,
      });

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('findRoute()', () => {
    it('should findRoute()', () => {
      ROUTE_CACHE.set = jest.fn(() => '');
      ROUTE_HELPERS.findRoutes = jest.fn(() => '');

      instance.findRoute({});

      TEST_HELPERS.expectCalled(ROUTE_CACHE.set);
      TEST_HELPERS.expectCalled(ROUTE_HELPERS.findRoutes);
    });
  });

  describe('findRouteSuccess()', () => {
    it('should findRouteSuccess() onSuccess', () => {
      dotProp.get = jest.fn(() => ({}));
      dotProp.set = jest.fn(() => ({}));
      ROUTE_CACHE.isValid = jest.fn(() => true);
      instance.count = 0;
      instance.total = 1;

      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess });
      rendered.setState({ error: false });

      instance.findRouteSuccess();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should findRouteSuccess() onError', () => {
      dotProp.get = jest.fn(() => ({}));
      dotProp.set = jest.fn(() => ({}));
      ROUTE_CACHE.isValid = jest.fn(() => true);
      instance.count = 0;
      instance.total = 1;

      const onError = jest.fn();
      rendered.setProps({ onError });
      rendered.setState({ error: true });

      instance.findRouteSuccess();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should findRouteSuccess() not finish', () => {
      dotProp.get = jest.fn(() => ({}));
      dotProp.set = jest.fn(() => ({}));
      ROUTE_CACHE.isValid = jest.fn(() => false);
      instance.count = 0;
      instance.total = 2;

      instance.findRouteSuccess();

      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });
  });

  describe('findRouteError()', () => {
    it('should findRouteError() NOT_FOUND call back', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => '');
      instance.count = 0;
      instance.total = 1;

      instance.findRouteError(
        NOT_FOUND,
        {
          id: 2233,
          index: 2,
          routeIds: [2233, 2233],
        },
        {
          geocoded_waypoints: [
            { geocoder_status: ZERO_RESULTS },
            { geocoder_status: ZERO_RESULTS },
            { geocoder_status: 'OK' },
          ],
        },
      );

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });

    it('should findRouteError() other status call back', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => '');
      instance.count = 0;
      instance.total = 2;

      instance.findRouteError('unknown', {}, {});

      TEST_HELPERS.expectNotCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
