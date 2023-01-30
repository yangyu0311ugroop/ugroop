import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import {
  EditableSelectForm,
  ANONYMOUS_FUNC,
  renderDefaultValue,
} from '../index';

describe('<EditableSelectForm />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <EditableSelectForm name="SelectForm" classes={{}} bold />,
    );
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableSelectForm).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('defaultProps', () => {
    it('return default renderValue', () => {
      expect(renderDefaultValue('test')).toBe('test');
    });
    describe('ANONYMOUS_FUNC', () => {
      it('call ANONYMOUS_FUNC', ANONYMOUS_FUNC);
    });
  });

  describe('instance', () => {
    it('renderPlaceholder', () => {
      rendered.setProps({ readOnly: true });
      expect(instance.renderPlaceholder()).toMatchSnapshot();
    });
    it('renderValue', () => {
      const renderValue = jest.fn();
      rendered.setProps({ value: 'test', renderValue });
      instance.renderValue();
      expect(renderValue).toBeCalledWith('test');
    });
    it('renderValue with no value', () => {
      rendered.setProps({ value: null });
      expect(instance.renderValue()).toMatchSnapshot();
    });
    it('stopPropagation', () => {
      const event = { stopPropagation: jest.fn() };
      instance.stopPropagation(event);
      expect(event.stopPropagation).toBeCalled();
    });
    it('handleFormRef', () => {
      instance.handleFormRef('test');
      expect(instance.form).toBe('test');
    });
    it('renderOptions', () => {
      const options = [{}];
      rendered.setProps({ options });
      const opt = instance.renderOptions();
      expect(opt).toEqual([{ className: '' }]);
    });
  });

  describe('setStates', () => {
    it('handleSubmitSuccess', () => {
      instance.handleSubmitSuccess();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleSubmitError', () => {
      instance.handleSubmitError();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleValidSubmit', () => {
      const onSubmit = jest.fn();
      rendered.setProps({ onSubmit });

      instance.handleValidSubmit('test');
      expect(onSubmit).toBeCalled();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleChange', () => {
      const form = { submit: jest.fn() };
      instance.form = { form };
      instance.handleChange('', true);
      expect(form.submit).toBeCalled();
      expect(rendered.state()).toMatchSnapshot();
      instance.handleChange('', false);
    });
    it('handleEditableClick', () => {
      instance.handleEditableClick();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleMenuOpen', () => {
      instance.stopPropagation = jest.fn();
      instance.handleMenuOpen('test');
      expect(rendered.state()).toMatchSnapshot();
      expect(instance.stopPropagation).toBeCalledWith('test');
    });
    it('handleMenuClose', () => {
      instance.stopPropagation = jest.fn();
      instance.handleMenuClose('test');
      expect(rendered.state()).toMatchSnapshot();
      expect(instance.stopPropagation).toBeCalledWith('test');
    });
  });
});
