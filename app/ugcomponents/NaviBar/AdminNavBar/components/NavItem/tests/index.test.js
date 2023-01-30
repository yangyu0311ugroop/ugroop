import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NavItem } from '../index';

describe('<NavItem />', () => {
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

    rendered = shallow(<NavItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(NavItem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps()', () => {
      rendered.setProps({ count: 1 });
      instance.handleCountChange = jest.fn();

      instance.componentWillReceiveProps({ count: 2 });

      TEST_HELPERS.expectCalled(instance.handleCountChange);
    });
  });

  describe('openTooltip()', () => {
    it('should openTooltip()', () => {
      instance.openTooltip();

      expect(rendered.state().tooltipOpen).toBe(true);
    });
  });

  describe('closeTooltip()', () => {
    it('should closeTooltip()', () => {
      instance.closeTooltip();

      expect(rendered.state().tooltipOpen).toBe(false);
    });
  });

  describe('handleCountChange()', () => {
    it('should handleCountChange() 9', () => {
      instance.openTooltip = jest.fn();
      instance.closeDelay = jest.fn();

      instance.handleCountChange(9);

      TEST_HELPERS.expectCalled(instance.openTooltip);
      TEST_HELPERS.expectCalled(instance.closeDelay);
    });

    it('should handleCountChange() 0', () => {
      instance.closeTooltip = jest.fn();

      instance.handleCountChange(0);

      TEST_HELPERS.expectCalled(instance.closeTooltip);
    });
  });

  describe('closeDelay()', () => {
    it('should closeDelay()', () => {
      global.setTimeout = jest.fn(cb => cb());
      instance.closeTooltip = jest.fn();

      instance.closeDelay();

      TEST_HELPERS.expectCalled(instance.closeTooltip);
    });
  });

  describe('renderTooltipTitle()', () => {
    it('should renderTooltipTitle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTooltipTitle);
    });
  });

  describe('renderContent()', () => {
    it('should return children', () => {
      rendered.setProps({ children: 'children' });

      expect(instance.renderContent()).toBe('children');
    });

    it('should return popper', () => {
      rendered.setProps({ popper: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should return icon', () => {
      rendered.setProps({ icon: 'icon' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('renderButton()', () => {
    it('should return count 0', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      rendered.setProps({ count: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });

    it('should renderButton count +', () => {
      instance.renderTooltipTitle = jest.fn(() => 'renderTooltipTitle');
      instance.renderContent = jest.fn(() => 'renderContent');

      rendered.setProps({ count: 10, renderTooltip: jest.fn() });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });
    it('should renderButton count +', () => {
      instance.renderTooltipTitle = jest.fn(() => 'renderTooltipTitle');
      instance.renderContent = jest.fn(() => 'renderContent');

      rendered.setProps({
        count: 10,
        renderTooltip: jest.fn(),
        renderCount: jest.fn(),
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderButton = jest.fn(() => 'renderButton');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
