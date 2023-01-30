import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { INSURANCE_MODES } from '../constants';
import { INSURANCE_HELPERS } from '../helpers';
import { Insurance } from '../index';

describe('<Insurance />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Insurance />);
    instance = rendered.instance();
  });

  describe('getValueName', () => {
    it('should call pathToNodeInputName', () => {
      NODE_STORE_HELPERS.pathToNodeInputName = jest.fn();
      instance.getValueName();
      expect(NODE_STORE_HELPERS.pathToNodeInputName).toHaveBeenCalled();
    });
  });

  describe('getPropStateValue', () => {
    it('should return prop', () => {
      expect(instance.getPropStateValue('prop', undefined)).toEqual('prop');
    });
    it('should return state', () => {
      expect(instance.getPropStateValue('prop', 'state')).toEqual('state');
    });
  });

  describe('getModeValue', () => {
    it('shold return mode', () => {
      rendered.setProps({
        mode: true,
      });
      expect(instance.getModeValue()).toBe(true);
    });
    it('should return INSURANCE_MODES.pending', () => {
      rendered.setProps({
        mode: null,
      });
      expect(instance.getModeValue()).toEqual(INSURANCE_MODES.pending);
    });
  });

  describe('getCurrentModeValue', () => {
    it('should return getPropStateValue', () => {
      instance.getPropStateValue = jest.fn(() => 'getPropStateValue');
      expect(instance.getCurrentModeValue()).toEqual('getPropStateValue');
    });
  });

  describe('getValue', () => {
    it('should return getPropStateValue', () => {
      instance.getPropStateValue = jest.fn(() => 'getPropStateValue');
      expect(instance.getValue()).toEqual('getPropStateValue');
    });
  });

  describe('renderEditable', () => {
    it('should render InsuranceEditableMenu', () => {
      rendered.setProps({
        userConnected: true,
        userInsurancePolicy: '0yes',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
    it('should render EditableTextForm', () => {
      rendered.setProps({
        userConnected: false,
        userInsurancePolicy: '0yes',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('handleModeChange', () => {
    it('should setState to just formMode', () => {
      const formMode = {};
      instance.handleModeChange(formMode);
      expect(rendered.state().formMode).toEqual({});
    });
    it('should set value to undefined', () => {
      rendered.setProps({
        mode: 1,
      });
      instance.getCurrentModeValue = jest.fn(() => 'pending');
      const formMode = {};
      instance.handleModeChange(formMode);
      expect(rendered.state().formMode).toEqual({ value: undefined });
    });
    it('should set value to isFormDate', () => {
      rendered.setProps({
        mode: 'pending',
      });
      instance.getCurrentModeValue = jest.fn(() => 'pending');
      const formMode = {};
      instance.handleModeChange(formMode);
      expect(rendered.state().formMode).toEqual({ value: undefined });
    });
  });

  describe('handleEditableSubmit', () => {
    it('should call updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      const model = { node: { customData: { insurancePolicy: 'wee' } } };
      instance.handleEditableSubmit({ model });
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
  });

  describe('hasEditableValue', () => {
    it('should return true', () => {
      INSURANCE_HELPERS.isDateMode = jest.fn(() => true);
      expect(instance.hasEditableValue({})).toBe(true);
    });
    it('should return value', () => {
      INSURANCE_HELPERS.isDateMode = jest.fn(() => false);
      expect(instance.hasEditableValue({ mode: 1, value: false })).toBe(false);
    });
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValueTextOnly', () => {
    it('should return value', () => {
      rendered.setProps({
        value: '1',
      });
      expect(instance.renderValueTextOnly()).toEqual('1');
    });
  });

  describe('renderTextOnly', () => {
    it('should return renderValueTextOnly', () => {
      instance.renderValueTextOnly = jest.fn(() => 'renderValueTextOnly');
      expect(instance.renderTextOnly()).toEqual('renderValueTextOnly');
    });
  });

  describe('renderValueInput', () => {
    it('should match snapshot', () => {
      instance.getValueName = jest.fn(() => 'bloop');
      instance.getValue = jest.fn(() => 'mlep');
      TEST_HELPERS.expectMatchSnapshot(instance.renderValueInput);
    });
  });

  describe('renderTextField', () => {
    it('should match snapshot', () => {
      instance.renderValueInput = jest.fn(() => 'renderValueInput');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
  });
});
