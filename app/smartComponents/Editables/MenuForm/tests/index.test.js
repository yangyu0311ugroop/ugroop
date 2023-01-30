import React from 'react';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { shallow } from 'enzyme';
import _ from 'lodash';
import { EditableMenuForm } from '../index';

describe('<EditableMenuForm />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<EditableMenuForm />);
    instance = rendered.instance();
  });

  describe('getRestProps', () => {
    it('should call _.omit', () => {
      _.omit = jest.fn();
      instance.getRestProps();
      expect(_.omit).toHaveBeenCalled();
    });
  });

  describe('handlePopperRef', () => {
    it('should set popper to ref', () => {
      instance.handlePopperRef('ref');
      expect(instance.popper).toEqual('ref');
    });
  });

  describe('handleEditableClick', () => {
    it('should call openMenu and onOpen', () => {
      const openMenu = jest.fn();
      const onOpen = jest.fn();
      const event = 'event';
      rendered.setProps({ onOpen });
      instance.handleEditableClick({ openMenu })(event);
      expect(openMenu).toHaveBeenCalledWith(event);
      expect(onOpen).toHaveBeenCalled();
    });
    it('should just call defaultProps', () => {
      const openMenu = jest.fn();
      const event = 'event';
      instance.handleEditableClick({ openMenu })(event);
      expect(openMenu).toHaveBeenCalledWith(event);
    });
  });

  describe('handleFormChange', () => {
    it('should call setState', () => {
      const currentValues = 1;
      instance.handleFormChange({ currentValues });
      expect(rendered.state().values).toEqual(currentValues);
    });
  });

  describe('handleFormValid', () => {
    it('should call setState', () => {
      instance.handleFormValid();
      expect(rendered.state().formValid).toBe(true);
    });
  });

  describe('handleFormInvalid', () => {
    it('should call setState', () => {
      instance.handleFormInvalid();
      expect(rendered.state().formValid).toBe(false);
    });
  });

  describe('handleFormValidSubmit', () => {
    it('should call onSubmit', () => {
      const onSubmit = jest.fn();
      rendered.setProps({ onSubmit });
      instance.popper = jest.fn(() => ({ closeMenu: 1 }));
      instance.handleFormValidSubmit('args');
      expect(onSubmit).toHaveBeenCalled();
    });
    it('should call onSubmit if this.popper is undefined', () => {
      const onSubmit = jest.fn();
      rendered.setProps({ onSubmit });
      instance.popper = null;
      instance.handleFormValidSubmit('args');
      expect(onSubmit).toHaveBeenCalled();
    });
    it('should just call defaultProps', () => {
      instance.popper = jest.fn(() => ({ closeMenu: 1 }));
      const snap = shallow(<div>{instance.handleFormValidSubmit('args')}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderPlaceholder', () => {
    it('should match snapshot if readOnly', () => {
      rendered.setProps({
        readOnly: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPlaceholder);
    });
    it('should match snapshot if readOnly is false', () => {
      rendered.setProps({
        readOnly: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPlaceholder);
    });
  });

  describe('renderValue', () => {
    it('should just use defaultProps', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue);
    });
    it('should return renderPlaceholder', () => {
      rendered.setProps({
        renderValue: jest.fn(() => false),
      });
      instance.renderPlaceholder = jest.fn(() => 'renderPlaceholder');
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue);
    });
    it('should match snapshot if renderActions', () => {
      rendered.setProps({
        renderValue: jest.fn(() => true),
        renderActions: jest.fn(() => 'actions'),
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue);
    });
    it('should match snapshot if renderActions is false', () => {
      rendered.setProps({
        renderValue: jest.fn(() => true),
        renderActions: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue);
    });
  });

  describe('renderButton', () => {
    it('should match snapshot', () => {
      instance.renderValue = jest.fn(() => 'value');
      instance.handleEditableClick = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });
  });

  describe('renderMenu', () => {
    it('should match snapshot', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => 'wow');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu('state')({}));
    });
  });
});
