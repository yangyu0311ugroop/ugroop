import { MENU_ITEM, TAB } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Item } from '../index';

describe('<Item />', () => {
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

    rendered = shallow(<Item {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Item).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleResize()', () => {
    it('should handleResize()', () => {
      const onResize = jest.fn();

      rendered.setProps({ onResize });

      instance.handleResize(5544);

      TEST_HELPERS.expectCalled(onResize);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('renderMenuItem()', () => {
    it('should renderMenuItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem);
    });
  });

  describe('render()', () => {
    it('should renderMenuItem', () => {
      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');

      rendered.setProps({ variant: MENU_ITEM });

      expect(instance.render()).toBe('renderMenuItem');
    });

    it('should renderTab', () => {
      // instance.renderTab = jest.fn(() => 'renderTab');

      rendered.setProps({ variant: TAB });

      // expect(instance.render()).toBe('renderTab');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
