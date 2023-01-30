import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ActionButtons } from '../index';

describe('<ActionsButtons />', () => {
  let rendered;
  let instance;
  const props = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    templateViewActions: {
      onMove: jest.fn(),
      onCopy: jest.fn(),
      onDelete: jest.fn(),
    },
    classes: [],
  };
  beforeEach(() => {
    rendered = shallow(<ActionButtons {...props} />);
    instance = rendered.instance();
  });

  describe('handleClickMenu', () => {
    it('should set state', () => {
      const ev = {
        currentTarget: 'currentTarget',
      };
      instance.handleClickMenu(ev);
      expect(rendered.state().anchorEl).toEqual('currentTarget');
    });
    it('should call handleMenuClose', () => {
      rendered.setState({
        anchorEl: 'el',
      });
      instance.handleCloseMenu = jest.fn();
      global.setTimeout = jest.fn(cb => cb());
      instance.handleClickMenu();
      expect(instance.handleCloseMenu).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.componentWillUnmount();
      expect(global.clearTimeout).toHaveBeenCalled();
    });
  });

  describe('onDelete', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.onDelete()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('handleEvents', () => {
    it('should set state', () => {
      instance.handleCloseMenu();
      expect(rendered.state().anchorEl).toEqual(null);
    });
  });

  describe('handleEvents', () => {
    it('should call event and set state', () => {
      const event = jest.fn();
      instance.handleEvents(event)();
      expect(rendered.state().anchorEl).toEqual(null);
      expect(event).toBeCalled();
    });
  });

  describe('render', () => {
    it('should match snapshot if can Move', () => {
      instance.canDelete = jest.fn(() => true);
      rendered.setProps({
        canMove: true,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('renderButton', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.renderButton()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
