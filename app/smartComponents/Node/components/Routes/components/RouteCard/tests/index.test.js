import { MAP } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RouteCard } from '../index';

describe('<RouteCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    replace: jest.fn(),
  };

  const props = {
    classes: {},
    location: {},
    history,
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<RouteCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RouteCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      rendered.setProps({ routes: [1], selectedId: 0, autoSelect: true });
      instance.handleClick = jest.fn(() => '');

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.handleClick);
    });
  });

  describe('goToMapView()', () => {
    it('should goToMapView()', () => {
      instance.goToMapView();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('handleClick()', () => {
    it('should handleClick()', () => {
      rendered.setProps({ selectedId: 22, layout: MAP });

      instance.handleClick(33);

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should goToMapView()', () => {
      rendered.setProps({ selectedId: 22, layout: !MAP });
      instance.goToMapView = jest.fn();
      instance.handleShowDetail = jest.fn();

      instance.handleClick(22);

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleShowDetail);
      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.goToMapView);
    });
  });

  describe('handleShowDetail()', () => {
    it('should handleShowDetail()', () => {
      instance.handleShowDetail(2233);

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('openAddRoute()', () => {
    it('should openAddRoute()', () => {
      PORTAL_HELPERS.openAddRoute = jest.fn(() => '');

      instance.openAddRoute();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddRoute);
    });
  });

  describe('renderNewRouteButton()', () => {
    it('should renderNewRouteButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewRouteButton);
    });
  });

  describe('renderRoute()', () => {
    it('should renderRoute', () => {
      rendered.setProps({ showActive: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRoute);
    });
  });

  describe('renderHeader()', () => {
    it('should renderHeader', () => {
      rendered.setProps({ showIndex: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });

  describe('renderDetail()', () => {
    it('should renderDetail', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDetail);
    });
  });

  describe('render()', () => {
    it('should renderDetail', () => {
      instance.renderDetail = jest.fn(() => 'renderDetail');

      rendered.setProps({ showDetail: 1, routes: [1], layout: MAP });

      expect(instance.render()).toBe('renderDetail');
    });

    it('should render empty', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');

      rendered.setProps({ showDetail: 0, routes: [], layout: MAP });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderRoute = jest.fn(() => 'renderRoute');

      rendered.setProps({ showDetail: 0, routes: [1], layout: MAP });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
