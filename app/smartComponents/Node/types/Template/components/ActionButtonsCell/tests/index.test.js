import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ActionButtonsCell } from '../index';

describe('<ActionButtonsCell />', () => {
  let rendered;
  let instance;

  const props = {
    id: 1,
    onDeleteItem: jest.fn(),
    templateViewActions: {
      onCopy: jest.fn(),
      onMove: jest.fn(),
      onDelete: jest.fn(),
    },
    onEdit: jest.fn(),
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<ActionButtonsCell {...props} />);
    instance = rendered.instance();
  });

  describe('canDelet', () => {
    it('should call ability.can', () => {
      ability.can = jest.fn();

      instance.canDelete();

      expect(ability.can).toBeCalled();
    });
  });

  describe('onDeleteItem', () => {
    it('should call handle events', () => {
      instance.handleEvents = jest.fn();
      const onClose = jest.fn();
      instance.onDeleteItem(onClose)();
      expect(onClose).toBeCalled();
      expect(instance.handleEvents).toBeCalled();
    });
  });

  describe('renderButton', () => {
    it('should match snapshot', () => {
      const openMenu = jest.fn();
      const snap = shallow(<div>{instance.renderButton({ openMenu })}</div>);

      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('handleEvents', () => {
    it('should call the event passed and also call set state', () => {
      const event = jest.fn();
      const onClose = jest.fn();
      instance.handleEvents(event, onClose)();
      expect(event).toBeCalled();
      expect(onClose).toBeCalled();
    });
  });

  describe('renderPopperOptions', () => {
    it('should match snapshot', () => {
      instance.canDelete = jest.fn(() => true);
      rendered.setProps({
        canMove: true,
      });
      const snapshot = shallow(<div>{instance.renderPopperOptions({})}</div>);

      expect(snapshot).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render move btn if canMove', () => {
      instance.renderButton = jest.fn(() => 'renderButton');
      instance.renderEditMenu = jest.fn(() => 'renderPopperOptions');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
