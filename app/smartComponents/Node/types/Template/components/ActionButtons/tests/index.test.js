import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { ActionButtons } from '../index';

describe('<ActionButtons />', () => {
  let rendered;
  let instance;

  const props = {
    onDelete: jest.fn(),
    templateViewActions: {
      onMove: jest.fn(),
      onCopy: jest.fn(),
      onDelete: jest.fn(),
    },
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<ActionButtons {...props} />);
    instance = rendered.instance();
  });

  describe('handleClickMenu', () => {
    it('should set state', () => {
      instance.handleClickMenu({ currentTarget: '1' });
      expect(rendered.state().anchorEl).toEqual('1');
    });
    it('should call handleCloseMenu if there is anchorEl', () => {
      rendered.setState({
        anchorEl: 'el',
      });
      instance.handleCloseMenu = jest.fn();
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

  describe('handleCloseMenu', () => {
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
      expect(event).toHaveBeenCalled();
    });
  });

  describe('renderMoveIcon', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderMoveIcon()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleCloseMenu', () => {
    it('should match snapshot', () => {
      global.setTimeout = jest.fn(cb => cb());
      const snapshot = shallow(<div>{instance.handleCloseMenu()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should call renderMoveIcon', () => {
      instance.canDelete = jest.fn(() => true);
      rendered.setProps({
        canMove: true,
      });
      instance.renderMoveIcon = jest.fn();
      instance.render();
      expect(instance.renderMoveIcon).toHaveBeenCalled();
    });
  });

  describe('renderMenuButton', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderMenuButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
