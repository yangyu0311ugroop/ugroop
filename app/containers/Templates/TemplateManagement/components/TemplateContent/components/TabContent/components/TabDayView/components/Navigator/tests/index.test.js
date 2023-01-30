import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Navigator } from '../index';

describe('<Navigator />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const history = {
    push: jest.fn(),
    replace: jest.fn(),
  };

  const props = {
    classes: {},
    location: {},
    history,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Navigator {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Navigator).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('selected()', () => {
    it('should return false', () => {
      rendered.setProps({ selectedId: 0 });

      expect(instance.selected()).toBe(false);
    });

    it('should return false #2', () => {
      rendered.setProps({ selectedId: 3, dayIds: [1, 2] });

      expect(instance.selected()).toBe(false);
    });

    it('should return true', () => {
      rendered.setProps({ selectedId: 1, dayIds: [1, 2] });

      expect(instance.selected()).toBe(true);
    });
  });

  describe('selectedIndex()', () => {
    it('should return 0', () => {
      instance.selected = jest.fn(() => false);

      expect(instance.selectedIndex()).toBe(0);
    });

    it('should return selectedIndex', () => {
      instance.selected = jest.fn(() => true);

      rendered.setProps({ dayIds: [1, 2, 3], selectedId: 3 });

      expect(instance.selectedIndex()).toBe(2);
    });
  });

  describe('renderBottomNavigation()', () => {
    it('should render first', () => {
      instance.selectedIndex = jest.fn(() => 0);
      rendered.setProps({ dayIds: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBottomNavigation);
    });

    it('should render middle', () => {
      instance.selectedIndex = jest.fn(() => 1);
      rendered.setProps({ dayIds: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBottomNavigation);
    });

    it('should render last', () => {
      instance.selectedIndex = jest.fn(() => 2);
      rendered.setProps({ dayIds: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBottomNavigation);
    });
  });

  describe('renderTopNavigation()', () => {
    it('should render first', () => {
      instance.selectedIndex = jest.fn(() => 0);
      rendered.setProps({ dayIds: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTopNavigation);
    });

    it('should render middle and today', () => {
      instance.selectedIndex = jest.fn(() => 1);
      rendered.setProps({ dayIds: [1, 2, 3], ongoing: true, todayIndex: 1 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTopNavigation);
    });

    it('should render last', () => {
      instance.selectedIndex = jest.fn(() => 2);
      rendered.setProps({ dayIds: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTopNavigation);
    });
  });

  describe('renderRouteNavigation()', () => {
    it('should renderRouteNavigation', () => {
      rendered.setProps({ clickId: 0, hoverId: 1, markerIds: [2, 1, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRouteNavigation);
    });
  });

  describe('render()', () => {
    it('should renderTopNavigation', () => {
      instance.renderTopNavigation = jest.fn(() => 'renderTopNavigation');

      rendered.setProps({ top: true });

      expect(instance.render()).toBe('renderTopNavigation');
    });

    it('should renderBottomNavigation', () => {
      instance.renderBottomNavigation = jest.fn(() => 'renderBottomNavigation');

      rendered.setProps({ top: false });

      expect(instance.render()).toBe('renderBottomNavigation');
    });

    it('should renderRouteNavigation', () => {
      instance.renderRouteNavigation = jest.fn(() => 'renderRouteNavigation');

      rendered.setProps({ route: true });

      expect(instance.render()).toBe('renderRouteNavigation');
    });
  });
});
