import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MoveButton } from '../index';

describe('<MoveButton />', () => {
  let rendered;
  let instance;

  const props = {
    openDialog: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<MoveButton {...props} />);
    instance = rendered.instance();
  });

  describe('componentWillUnmount', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.componentWillUnmount();
      expect(global.clearTimeout).toHaveBeenCalled();
    });
  });

  describe('renderMenuItem()', () => {
    it('should renderMenuItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem([1, 2]));
    });
    it('should render no other followers', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem([1]));
    });
  });

  describe('handleMenuAction', () => {
    it('should call handleMenuClose', () => {
      instance.handleMenuClose = jest.fn();
      rendered.setState({
        anchorEl: true,
      });
      global.setTimeout = jest.fn(cb => cb());
      instance.handleMenuAction();
      expect(instance.handleMenuClose).toHaveBeenCalled();
    });
    it('should setState to ev.currentTarget', () => {
      rendered.setState({
        anchorEl: false,
      });
      const ev = {
        currentTarget: 1,
      };
      instance.handleMenuAction(ev);
      expect(rendered.state().anchorEl).toEqual(1);
    });
  });

  describe('handleMenuClose', () => {
    it('should call setState', () => {
      instance.handleMenuClose();
      expect(rendered.state().anchorEl).toEqual(null);
    });
  });

  describe('renderButton', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });
  });
  describe('handleOpenDialog', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        openDialog: jest.fn(() => jest.fn(() => 'test')),
      });
      instance.handleOpenDialog(1)();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        templateId: 1,
        openDialog: jest.fn(() => jest.fn(() => 'test')),
        parentId: 2,
      });
      instance.handleMenuClose = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
