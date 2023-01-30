import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import {
  EditableToggleForm,
  ANONYMOUS_FUNC,
  renderDefaultValue,
} from '../index';

jest.useFakeTimers();

describe('<EditableToggleForm />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <EditableToggleForm name="TextForm" onSubmit={jest.fn()} classes={{}} />,
    );
    instance = rendered.instance();
  });

  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableToggleForm).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render editing properly', () => {
      rendered.setState({ editing: true });
      rendered.setProps({ fullWidth: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    it('renderValue', () => {
      const renderValue = jest.fn();
      rendered.setProps({ value: 'test', renderValue });
      instance.renderValue();
      expect(renderValue).toBeCalledWith('test');
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
    it('handleEditableClick', () => {
      instance.handleEditableClick();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleEditableClick not sets state if state.loading', () => {
      instance.setState({ loading: true });
      instance.setState = jest.fn();
      instance.handleEditableClick();
      expect(instance.setState).not.toBeCalled();
    });
    it('handleFormRef', () => {
      const ref = 'ref';
      instance.handleFormRef(ref);
      expect(instance.form).toBe(ref);
    });
    it('handleChange', () => {
      instance.form = { form: { submit: jest.fn() } };
      instance.handleChange();
      expect(instance.form.form.submit).toBeCalled();
    });
  });
});
