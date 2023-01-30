import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { QuickAccessTours } from '../index';

describe('<QuickAccessTours />', () => {
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

    rendered = shallow(<QuickAccessTours {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(QuickAccessTours).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      instance.fetchRecentTours = jest.fn(() => '');

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.fetchRecentTours);
    });
  });

  describe('fetchRecentTours()', () => {
    it('should fetchRecentTours()', () => {
      instance.fetchRecentTours();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('renderTour()', () => {
    it('should renderTour', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTour());
    });
  });

  describe('handleSeeAll()', () => {
    it('should handleSeeAll()', () => {
      const closeMenu = jest.fn(() => '');

      instance.handleSeeAll(closeMenu)();

      TEST_HELPERS.expectCalled(closeMenu);
    });
  });

  describe('renderMenu()', () => {
    it('should return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [
        { stars: [], recent: [] },
      ]);
    });

    it('should renderMenu', () => {
      instance.renderTour = jest.fn(() => () => 'renderTour');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [
        { stars: [1], recent: [2] },
      ]);
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
