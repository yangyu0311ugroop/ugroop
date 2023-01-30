import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableDateForm, ANONYMOUS_FUNC } from '../index';

describe('<EditableDateForm />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<EditableDateForm name="DateForm" />);
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableDateForm).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('defaultProps', () => {
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
    it('handleFormRef', () => {
      instance.handleFormRef('test');
      expect(instance.form).toBe('test');
    });
    it('handleDateRef', () => {
      instance.handleDateRef('test');
      expect(instance.date).toBe('test');
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
      const args = [1, 2];
      rendered.setProps({ onChange: jest.fn() });
      instance.handleChange(...args);
      expect(instance.props.onChange).toBeCalledWith(...args);
    });
    it('handleEditableClick opens picker', () => {
      instance.date = { picker: { open: jest.fn() } };
      instance.handleEditableClick();
      expect(instance.date.picker.open).toBeCalled();
    });
    it('handleEditableClick not opens picker if state.loading', () => {
      rendered.setState({ loading: true });
      instance.date = { picker: { open: jest.fn() } };
      instance.handleEditableClick();
      expect(instance.date.picker.open).not.toBeCalled();
    });
    it('submitForm submits form', () => {
      instance.form = { form: { submit: jest.fn() } };
      instance.submitForm();
      expect(instance.form.form.submit).toBeCalled();
    });
  });
});
