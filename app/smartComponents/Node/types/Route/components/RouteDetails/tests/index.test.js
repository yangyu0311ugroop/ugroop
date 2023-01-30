import { shallow } from 'enzyme';
import React from 'react';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RouteDetails } from '../index';

describe('<RouteDetails />', () => {
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

    rendered = shallow(<RouteDetails {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RouteDetails).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should not call setValue', () => {
      rendered.setProps({ clickId: 2233 });

      instance.componentDidMount();

      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });

    it('should call setValue', () => {
      rendered.setProps({ clickId: 0, markerIds: [1] });

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('routeIds()', () => {
    it('should routeIds()', () => {
      ROUTE_HELPERS.routeIds = jest.fn(() => 'ROUTE_HELPERS.routeIds');

      expect(instance.routeIds()).toBe('ROUTE_HELPERS.routeIds');
    });
  });

  describe('renderMarker()', () => {
    it('should renderMarker', () => {
      rendered.setProps({
        ids: [1, 2, 3, 4, 5],
        origin: 2,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMarker, [2233, 2]);
    });
  });

  describe('renderBrokenDay()', () => {
    it('should renderBrokenDay', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBrokenDay, [2233]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderBrokenDay = jest.fn(() => 'renderBrokenDay');
      instance.renderMarker = jest.fn(() => 'renderMarker');
      instance.routeIds = jest.fn(() => [2, 3, 4]);

      rendered.setProps({
        ids: [1, 2, 3, 4, 5],
        origin: 2,
        destination: 4,
        markerIds: [1, 2, 4, 5],
        distance: 3332,
      });
      rendered.setState({ brokenIds: [3] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
