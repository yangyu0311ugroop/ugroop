import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { SCHOOL_ORG_TYPE } from 'containers/Profile/constants';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PERSON_TYPES } from '../constants';
import { PersonType } from '..';

describe('<PersonType />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<PersonType {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#handleSubmit()', () => {
    it('calls NODE_API_HELPERS.updateNode and setState', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmit({
        model: {
          node: {
            customData: {
              personType: '',
            },
          },
        },
        onSuccess: 'onSuccess',
        onError: 'onError',
      });
      expect(wrapper.state().showOtherTextField).toBe(true);
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
    it('calls NODE_API_HELPERS.updateNode and not setState', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmit({
        model: {
          node: {
            customData: {
              personType: 'leader',
            },
          },
        },
        onSuccess: 'onSuccess',
        onError: 'onError',
      });
      expect(wrapper.state().showOtherTextField).toBe(false);
      expect(NODE_API_HELPERS.updateNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleClear', () => {
    it('should setState', () => {
      instance.handleClear();
      expect(wrapper.state().showOtherTextField).toBe(false);
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot if orgType is not SCHOOL_ORG_TYPE', () => {
      wrapper.setProps({
        orgType: '',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
    it('still matches snapshot if school is org type and other conditions are true', () => {
      wrapper.setState({ showOtherTextField: true });
      wrapper.setProps({ defaultValue: 'val', orgType: SCHOOL_ORG_TYPE });
      instance.getValue = jest.fn(() => 'val');
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
    it('should still match snapshot if other conditions are not met', () => {
      wrapper.setState({ showOtherTextField: false });
      wrapper.setProps({ defaultValue: 'val', orgType: SCHOOL_ORG_TYPE });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
    it('should still match snapshot if other conditions are not met', () => {
      wrapper.setState({ showOtherTextField: true });
      instance.getValue = jest.fn(() => 'value');
      wrapper.setProps({ defaultValue: 'val', orgType: SCHOOL_ORG_TYPE });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('#renderTextField()', () => {
    it('still matches snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
  });

  describe('renderProp', () => {
    it('should call children as function', () => {
      const newProps = {
        children: jest.fn(),
      };
      wrapper.setProps(newProps);

      instance.renderProp();

      expect(newProps.children).toBeCalled();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('renderTypeEditable()', () => {
    it('should return null', () => {
      expect(instance.renderTypeEditable(null)).toBe(null);
    });

    it('should renderTypeEditable', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderTypeEditable(PERSON_TYPES.student),
      );
    });
  });

  describe('getValue', () => {
    it('should return other if empty string', () => {
      wrapper.setProps({ value: '' });
      expect(instance.getValue(true)).toEqual('other');
    });
    it('should return other if empty null', () => {
      wrapper.setProps({ value: null });
      expect(instance.getValue(true)).toEqual('other');
    });
  });

  describe('renderEditableWithType()', () => {
    it('should renderEditableWithType', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableWithType);
    });
    it('should renderEditableWithType if there is type', () => {
      instance.renderTypeEditable = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableWithType);
    });
  });

  describe('handleTextFieldSubmit', () => {
    it('should call updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleTextFieldSubmit({
        model: {},
        onSuccess: jest.fn(),
        onError: jest.fn,
      });
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
  });

  describe('renderTextOnly()', () => {
    it('should renderTextOnly if includesValue', () => {
      instance.getValue = jest.fn(() => 'leader');
      wrapper.setProps({ typeOnly: true, renderDot: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
    it('should renderTextOnly if not includesValue', () => {
      instance.getValue = jest.fn(() => 'boy');
      wrapper.setProps({ typeOnly: true, renderDot: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
    it('should renderTextOnly if includesValue and typeOnly', () => {
      instance.getValue = jest.fn(() => 'leader');
      wrapper.setProps({ typeOnly: false, renderDot: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });
});
