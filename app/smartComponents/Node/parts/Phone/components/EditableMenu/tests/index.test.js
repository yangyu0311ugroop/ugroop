import React from 'react';
import dotProp from 'dot-prop-immutable';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PHONE_HELPERS } from 'utils/helpers/phone';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';

import { PhoneEditableMenu } from '..';
import inputs from '../../../inputs';

describe('<PhoneEditableMenu />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<PhoneEditableMenu />);
    instance = rendered.instance();
  });

  describe('getUserPhoneIdName', () => {
    it('should call NODE_STORE_HELPERS.pathToNodeInputName', () => {
      NODE_STORE_HELPERS.pathToNodeInputName = jest.fn();
      instance.getUserPhoneIdName();
      expect(NODE_STORE_HELPERS.pathToNodeInputName).toHaveBeenCalled();
    });
  });

  describe('getValueName', () => {
    it('should equal name', () => {
      expect(instance.getValueName()).toEqual(inputs.editableMenuInput.name);
    });
  });

  describe('getDefaultUserValueId', () => {
    it('should return userValues[0][0]', () => {
      rendered.setProps({ userValues: [[1]] });
      expect(instance.getDefaultUserValueId()).toEqual(1);
    });
    it('should return null', () => {
      rendered.setProps({ userValues: [] });
      expect(instance.getDefaultUserValueId()).toEqual(null);
    });
  });

  describe('getUserValue', () => {
    it('should return userValue[1]', () => {
      rendered.setProps({ userValues: [[1, 2]] });
      expect(instance.getUserValue(1)).toEqual(2);
    });
    it('should return null', () => {
      rendered.setProps({ userValues: [[2, 2]] });
      expect(instance.getUserValue(1)).toEqual(null);
    });
  });

  describe('getDefaultUserValue', () => {
    it('should return userValues[0][1]', () => {
      rendered.setProps({ userValues: [[1, 2]] });
      expect(instance.getDefaultUserValue()).toEqual(2);
    });
    it('should return null', () => {
      rendered.setProps({ userValues: [] });
      expect(instance.getDefaultUserValue()).toEqual(null);
    });
  });

  describe('getMenuItemProps', () => {
    it('should return saving', () => {
      rendered.setState({ saving: true });
      expect(instance.getMenuItemProps()).toEqual({ disabled: true });
    });
    it('should return disabled', () => {
      rendered.setState({ saving: false });
      expect(instance.getMenuItemProps(true)).toEqual({ disabled: true });
    });
  });

  describe('patchNode', () => {
    it('should call NODE_API_HELPERS.updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.patchNode({}, {});
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
  });

  describe('handleUpdateNodeSuccess', () => {
    it('should call closeMenu', () => {
      const closeMenu = jest.fn();
      instance.handleUpdateNodeSuccess({ closeMenu })();
      expect(rendered.state().saving).toBe(false);
      expect(closeMenu).toHaveBeenCalled();
    });
  });

  describe('handleUpdateNodeError', () => {
    it('should set state', () => {
      instance.handleUpdateNodeError();
      expect(rendered.state().saving).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should patchNode', () => {
      dotProp.set = jest.fn();
      instance.patchNode = jest.fn();
      instance.handleSubmit({ model: {} }, {});
      expect(instance.patchNode).toHaveBeenCalled();
    });
  });

  describe('handleUserSelect', () => {
    it('should patchNode', () => {
      dotProp.set = jest.fn();
      instance.patchNode = jest.fn();
      instance.handleUserSelect(1, {})();
      expect(instance.patchNode).toHaveBeenCalled();
    });
  });

  describe('handleNodeSelect', () => {
    it('should patchNode', () => {
      dotProp.set = jest.fn();
      instance.patchNode = jest.fn();
      instance.handleNodeSelect({})();
      expect(instance.patchNode).toHaveBeenCalled();
    });
  });

  describe('handleClearValue', () => {
    it('should patchNode', () => {
      dotProp.set = jest.fn();
      instance.patchNode = jest.fn();
      instance.handleClearValue({})();
      expect(instance.patchNode).toHaveBeenCalled();
    });
  });

  describe('handlePickerOpen', () => {
    it('should setState', () => {
      instance.handlePickerOpen();
      expect(rendered.state().picker).toBe(true);
    });
  });

  describe('handlePickerClose', () => {
    it('should setState', () => {
      instance.handlePickerClose();
      expect(rendered.state().picker).toBe(false);
    });
  });

  describe('renderNonInputValue', () => {
    it('should match snapshot', () => {
      PHONE_HELPERS.parseNumber = jest.fn(() => 'value');
      TEST_HELPERS.expectMatchSnapshot(instance.renderNonInputValue('1'));
    });
    it('should return value', () => {
      PHONE_HELPERS.parseNumber = jest.fn(() => false);
      expect(instance.renderNonInputValue('1')).toEqual('1');
    });
  });

  describe('renderMenuItemInput', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemInput);
    });
  });

  describe('renderIsDefault', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIsDefault(1)());
    });
  });

  describe('renderMenuItemUserValue', () => {
    it('should match snapshot if userPhoneId === id', () => {
      rendered.setProps({ userPhoneId: 1 });
      instance.renderNonInputValue = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderMenuItemUserValue(1, 1, false, {}),
      );
    });
    it('should match snapshot if isDefault and userPhoneId === 0', () => {
      rendered.setProps({ userPhoneId: 0 });
      instance.renderNonInputValue = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderMenuItemUserValue(1, 1, true, {}),
      );
    });
  });

  describe('renderMenuItemUserValues', () => {
    it('should match snapshot', () => {
      rendered.setProps({ userValues: [[1, 'value']] });
      instance.getDefaultUserValueId = jest.fn(() => 1);
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemUserValues({}));
    });
  });

  describe('renderMenuItemNodeValue', () => {
    it('should match snapshot', () => {
      rendered.setProps({ value: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemNodeValue({}));
    });
  });

  describe('renderMenuItemClear', () => {
    it('should match snapshot if value', () => {
      rendered.setProps({ value: 'val' });
      instance.handleClearValue = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemClear({}));
    });
    it('should match snapshot if userPhoneId', () => {
      rendered.setProps({ value: false, userPhoneId: 1 });
      instance.handleClearValue = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemClear({}));
    });
    it('should match snapshot if userPhoneId === 0', () => {
      rendered.setProps({ value: false, userPhoneId: 0 });
      instance.handleClearValue = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemClear({}));
    });
  });

  describe('renderMenu', () => {
    it('should match snapshot', () => {
      instance.renderMenuItemInput = jest.fn(() => 'renderMenuItemInput');
      instance.renderMenuItemClear = jest.fn(() => 'renderMenuItemClear');
      instance.renderMenuItemNodeValue = jest.fn(
        () => 'renderMenuItemNodeValue',
      );
      instance.renderMenuItemUserValues = jest.fn(
        () => 'renderMenuItemUserValues',
      );
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu({}));
    });
  });

  describe('renderMenuItemSubmit', () => {
    it('should match snapshot if valid', () => {
      PHONE_HELPERS.renderNumberInternational = jest.fn(() => '1');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemSubmit(1, true));
    });
    it('should match snapshot if not valid', () => {
      PHONE_HELPERS.renderNumberInternational = jest.fn(() => '1');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItemSubmit(1, false));
    });
  });

  describe('renderMenuSubmit', () => {
    it('should return renderMenutItemSubmit', () => {
      instance.getValueName = jest.fn(() => 1);
      const values = { 1: 'name' };
      instance.renderMenuItemSubmit = jest.fn();
      PHONE_HELPERS.isValidNumber = jest.fn(() => true);
      instance.renderMenuSubmit({ values });
      expect(instance.renderMenuItemSubmit).toHaveBeenCalled();
    });
    it('should not return renderMenutItemSubmit', () => {
      instance.getValueName = jest.fn(() => false);
      const values = { 1: 'name' };
      instance.renderMenuItemSubmit = jest.fn();
      PHONE_HELPERS.isValidNumber = jest.fn(() => true);
      instance.renderMenuSubmit({ values });
      expect(instance.renderMenuItemSubmit).not.toHaveBeenCalled();
    });
    it('should not return renderMenutItemSubmit if no values', () => {
      instance.getValueName = jest.fn(() => false);
      const values = null;
      instance.renderMenuItemSubmit = jest.fn();
      PHONE_HELPERS.isValidNumber = jest.fn(() => true);
      instance.renderMenuSubmit({ values });
      expect(instance.renderMenuItemSubmit).not.toHaveBeenCalled();
    });
  });

  describe('renderValue', () => {
    it('should return renderValue with getUserValue', () => {
      const renderValue = jest.fn();
      rendered.setProps({ renderValue, userPhoneId: 1 });
      instance.getUserValue = jest.fn(() => 1);
      instance.renderValue();
      expect(renderValue).toHaveBeenCalledWith(1);
    });
    it('should return renderValue with getDefaultUserValue', () => {
      const renderValue = jest.fn();
      rendered.setProps({ renderValue, userPhoneId: 0 });
      instance.getDefaultUserValue = jest.fn(() => 1);
      instance.renderValue();
      expect(renderValue).toHaveBeenCalledWith(1);
    });
    it('should just return renderValue with value', () => {
      const renderValue = jest.fn();
      rendered.setProps({ renderValue, userPhoneId: null, value: 1 });
      instance.renderValue();
      expect(renderValue).toHaveBeenCalledWith(1);
    });
    it('should just call defaultValue of renderValue', () => {
      instance.renderValue();
    });
  });

  describe('renderActions', () => {
    it('should match snapshot if userPhoneId', () => {
      rendered.setProps({ userPhoneId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderActions);
    });
    it('should match snapshot if userPhoneId', () => {
      rendered.setProps({ userPhoneId: 0 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderActions);
    });
    it('should match snapshot if userPhoneId', () => {
      rendered.setProps({ userPhoneId: null });
      TEST_HELPERS.expectMatchSnapshot(instance.renderActions);
    });
  });
});
