import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MenuItem } from '../index';

describe('<MenuItem />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<MenuItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MenuItem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClickMenu()', () => {
    it('should handleClickMenu()', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const stopPropagation = jest.fn();

      instance.handleClickMenu({ stopPropagation });

      TEST_HELPERS.expectCalledAndMatchSnapshot(LOGIC_HELPERS.ifFunction);
      TEST_HELPERS.expectCalledAndMatchSnapshot(stopPropagation);
    });

    it('should not stopPropagation', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const stopPropagation = jest.fn();
      rendered.setProps({ stopPropagation: false });

      instance.handleClickMenu({ stopPropagation });

      TEST_HELPERS.expectCalledAndMatchSnapshot(LOGIC_HELPERS.ifFunction);
      expect(stopPropagation).not.toBeCalled();
    });
  });

  describe('renderIcon()', () => {
    it('should return null', () => {
      rendered.setProps({ icon: '' });

      expect(instance.renderIcon()).toBe(null);
    });

    it('should renderIcon', () => {
      rendered.setProps({ icon: 'icon' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
    });
  });

  describe('renderMenuItem()', () => {
    it('should renderMenuItem', () => {
      rendered.setProps({ compact: true });
      instance.renderIcon = jest.fn(() => 'renderIcon');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem);
    });
  });

  describe('renderDefault()', () => {
    it('should render div', () => {
      rendered.setProps({ onClick: null });

      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });

    it('should render button', () => {
      rendered.setProps({ onClick: jest.fn() });

      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      TEST_HELPERS.expectCalledAndMatchSnapshot(LOGIC_HELPERS.switchCase);
    });
  });
});
