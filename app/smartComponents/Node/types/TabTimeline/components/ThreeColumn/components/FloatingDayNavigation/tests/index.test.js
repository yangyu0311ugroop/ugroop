import { shallow } from 'enzyme';
import React from 'react';
import { scroller } from 'react-scroll';
import Sticky from 'react-stickynode';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FloatingDayNavigation } from '../index';

describe('<FloatingDayNavigation />', () => {
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

    rendered = shallow(<FloatingDayNavigation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FloatingDayNavigation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidUpdate()', () => {
    it('should componentDidUpdate()', () => {
      rendered.setProps({ dayIds: [1] });
      instance.updateItems = jest.fn();

      instance.componentDidUpdate({ dayIds: [2] });

      TEST_HELPERS.expectCalled(instance.updateItems);
    });
  });

  describe('updateItems()', () => {
    it('should return null', () => {
      rendered.setProps({ dayIds: [] });

      expect(instance.updateItems()).toBe(null);
    });

    it('should updateItems', () => {
      rendered.setProps({ dayIds: [1] });

      expect(rendered.state().items).toEqual(['day1']);
    });
  });

  describe('handleStateChange', () => {
    it('should change sticky status if status of sticky is fixed', () => {
      instance.handleStateChange({ status: Sticky.STATUS_FIXED });
      expect(rendered.state().sticky).toBe(true);
    });

    it('should change sticky status to false if status is not fixed', () => {
      expect(instance.handleStateChange()).toBe(undefined);
    });
  });

  describe('scrollToDay()', () => {
    it('should scrollToDay()', () => {
      scroller.scrollTo = jest.fn();

      instance.scrollToDay(1)();

      TEST_HELPERS.expectCalled(scroller.scrollTo);
    });

    it('should scroll to top when layout is day', () => {
      scroller.scrollTo = jest.fn();
      rendered.setProps({
        layout: 'day',
      });

      instance.scrollToDay(1)();

      expect(scroller.scrollTo).toBeCalledWith('scrollToTop');
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [{ dayIds: [1] }]);
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('handleScroll()', () => {
    it('should return null', () => {
      expect(instance.handleScroll()).toBe(null);
    });

    it('should handleScroll', () => {
      instance.handleScroll({ id: 'day1' });

      expect(rendered.state().activeId).toBe(1);
    });

    it('should handleScroll invalid id', () => {
      instance.handleScroll({ id: 'daywrong' });

      expect(instance.handleScroll()).toBe(null);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setState({ items: [] });

      expect(instance.render()).toBe(null);
    });

    it('should return null !sticky', () => {
      rendered.setState({ items: ['day1'], sticky: false });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render sticky ', () => {
      rendered.setState({ items: ['day1'], sticky: true, activeId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
