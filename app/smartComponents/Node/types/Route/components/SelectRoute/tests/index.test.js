import { SELECTED, SELECTING } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { SelectRoute } from '../index';

describe('<SelectRoute />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    googleMaps: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<SelectRoute {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SelectRoute).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('resetSelect()', () => {
    it('should resetSelect()', () => {
      instance.resetSelect();

      expect(rendered.state().status).toBe(SELECTING);
      expect(rendered.state().origin).toBe(undefined);
      expect(rendered.state().destination).toBe(undefined);
      expect(rendered.state().destinationHover).toBe(undefined);
    });
  });

  describe('routeSelected()', () => {
    it('should routeSelected()', () => {
      instance.routeSelected({ origin: 1, destination: 2 });

      expect(rendered.state().status).toBe(SELECTED);
      expect(rendered.state().selectedRouteId).toBe(`${1}_${2}`);
    });
  });

  describe('routeSelecting()', () => {
    it('should routeSelecting()', () => {
      rendered.setState({ origin: 1, destination: 2 });

      instance.routeSelecting();

      expect(rendered.state().status).toBe(SELECTING);
      expect(rendered.state().currentOrigin).toBe(1);
      expect(rendered.state().currentDestination).toBe(2);
    });
  });

  describe('finishEditStops()', () => {
    it('should finishEditStops()', () => {
      instance.finishEditStops();

      expect(rendered.state().status).toBe(SELECTED);
    });
  });

  describe('cancelEditStops()', () => {
    it('should cancelEditStops()', () => {
      rendered.setState({ currentOrigin: 11, currentDestination: 22 });
      instance.cancelEditStops();

      expect(rendered.state().status).toBe(SELECTED);
      expect(rendered.state().origin).toBe(11);
      expect(rendered.state().destination).toBe(22);
      expect(rendered.state().currentOrigin).toBe(null);
      expect(rendered.state().currentDestination).toBe(null);
    });
  });

  describe('handleMouseEnter()', () => {
    it('should handleMouseEnter()', () => {
      instance.handleMouseEnter(11)();

      expect(rendered.state().destinationHover).toBe(11);
    });
  });

  describe('handleClick()', () => {
    it('should set origin', () => {
      rendered.setProps({ ids: [1, 2, 3, 4, 5] });
      rendered.setState({ origin: 0, destination: 0 });

      instance.handleClick(2, 1)();

      expect(rendered.state().origin).toBe(2);
      expect(rendered.state().destination).toBe(0);
    });

    it('should unset origin', () => {
      instance.resetSelect = jest.fn();
      rendered.setProps({ ids: [1, 2, 3, 4, 5] });
      rendered.setState({ origin: 2, destination: 0 });

      instance.handleClick(2, 1)();

      TEST_HELPERS.expectCalled(instance.resetSelect);
    });

    it('should unset destination', () => {
      rendered.setProps({ ids: [1, 2, 3, 4, 5] });
      rendered.setState({ origin: 1, destination: 2, destinationHover: 3 });

      instance.handleClick(2, 1)();

      expect(rendered.state().origin).toBe(1);
      expect(rendered.state().destination).toBe(undefined);
    });

    it('should swap', () => {
      rendered.setProps({ ids: [1, 2, 3, 4, 5] });
      rendered.setState({ origin: 4, destination: undefined });

      instance.handleClick(2, 1)();

      expect(rendered.state().origin).toBe(2);
      expect(rendered.state().destination).toBe(4);
    });

    it('should set destination', () => {
      instance.routeSelected = jest.fn();
      rendered.setProps({ ids: [1, 2, 3, 4, 5] });
      rendered.setState({ origin: 2, destination: undefined });

      instance.handleClick(4, 3)();

      TEST_HELPERS.expectCalled(instance.routeSelected);
    });
  });

  describe('routeIds()', () => {
    it('should routeIds()', () => {
      ROUTE_HELPERS.routeIds = jest.fn();

      instance.routeIds();

      TEST_HELPERS.expectCalled(ROUTE_HELPERS.routeIds);
    });
  });

  describe('handleRouteFound()', () => {
    it('should handleRouteFound()', () => {
      rendered.setProps({});
      ROUTE_HELPERS.normaliseResult = jest.fn(() => ({ distance: 2233 }));

      instance.handleRouteFound();

      expect(rendered.state().distance).toBe(2233);
    });
  });

  describe('handleRouteNotFound()', () => {
    it('should handleRouteNotFound()', () => {
      rendered.setProps({});
      LOGIC_HELPERS.ifFunction = jest.fn();

      instance.handleRouteNotFound();

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });

  describe('renderSubtitle()', () => {
    it('should render clear selection', () => {
      rendered.setState({ origin: 11, destination: 14, destinationHover: 13 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle, [11]);
    });

    it('should render unset destination', () => {
      rendered.setState({ origin: 11, destination: 14, destinationHover: 13 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle, [14]);
    });

    it('should render set', () => {
      rendered.setState({ origin: 11, destination: 14, destinationHover: 13 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle, [13]);
    });

    it('should render null', () => {
      rendered.setState({ origin: 11, destination: 14, destinationHover: 13 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle, [12]);
    });
  });

  describe('render()', () => {
    it('should renderSelecting', () => {
      instance.renderSelecting = jest.fn(() => 'renderSelecting');
      rendered.setState({ status: SELECTING });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderSelected', () => {
      instance.renderSelected = jest.fn(() => 'renderSelected');
      rendered.setState({ status: SELECTED });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
