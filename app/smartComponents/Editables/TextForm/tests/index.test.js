import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableTextForm, ANONYMOUS_FUNC, renderDefaultValue } from '../index';

jest.useFakeTimers();

describe('<EditableTextForm />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <EditableTextForm name="TextForm" onSubmit={jest.fn()} classes={{}} />,
    );
    instance = rendered.instance();
  });

  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableTextForm).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render editing properly', () => {
      rendered.setProps({ fullWidth: true });
      rendered.setState({ editing: true, showClear: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    it('componentDidMount', () => {
      rendered.setProps({ value: 'abcd' });
      instance.componentDidMount();
      expect(instance.state.showClear).toBe(true);
    });
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
    it('renderClearAction return null', () => {
      expect(instance.renderClearAction()).toBe(null);
    });
    it('renderClearAction', () => {
      rendered.setState({ showClear: true });
      const snapshot = shallow(<div>{instance.renderClearAction()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render different value if renderActions exist', () => {
      rendered.setProps({
        renderActions: () => <div />,
      });
      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('createFormRef', () => {
      instance.createFormRef('test');
      expect(instance.form).toBe('test');
    });
    it('cancelOnEscape', () => {
      const e = { keyCode: 27 };
      instance.handleCancel = jest.fn();

      instance.input = { value: '' };
      instance.cancelOnEscape(e);
      expect(instance.handleCancel).toBeCalled();
      expect(instance.state.showClear).toBe(false);

      instance.input = { value: '123' };
      instance.cancelOnEscape(e);
      expect(instance.handleCancel).toBeCalled();
      expect(instance.state.showClear).toBe(true);

      instance.input = { value: '123' };
      rendered.setState({ showClear: true });
      instance.cancelOnEscape(e);

      instance.input = null;
      instance.cancelOnEscape({});
    });
    it('handleFocus', () => {
      const input = { focus: jest.fn() };
      instance.handleFocus();
      instance.input = input;
      instance.handleFocus();
      expect(input.focus).toBeCalled();
    });
    it('createInputRef', () => {
      instance.createInputRef('input');
      expect(instance.input).toBe('input');
    });
    it('clearInput', () => {
      const form = { resetForm: jest.fn() };
      instance.form = form;
      instance.handleFocus = jest.fn();
      instance.clearInput();
      expect(form.resetForm).toBeCalled();
      expect(instance.handleFocus).toBeCalled();
      expect(instance.state.cleared).toBe(true);
      expect(instance.state.showClear).toBe(false);
    });
    it('clearInput with on clear props to be called', () => {
      const onClear = jest.fn();
      rendered.setProps({ onClear });
      const form = { resetForm: jest.fn() };
      instance.form = form;
      instance.handleFocus = jest.fn();
      instance.clearInput();
      expect(onClear).toBeCalled();
      expect(form.resetForm).toBeCalled();
      expect(instance.handleFocus).toBeCalled();
      expect(instance.state.cleared).toBe(true);
      expect(instance.state.showClear).toBe(false);
    });
    it('handleBlur when autoSaveOnBlur is true', () => {
      const form = { submitForm: jest.fn() };
      instance.form = form;
      instance.handleBlur();
      jest.runAllTimers();
      expect(form.submitForm).toBeCalled();
    });
    it('handleBlur when autoSaveOnCancel is true', () => {
      rendered.setProps({ autoSaveOnBlur: false, autoSaveOnCancel: true });
      instance.handleCancel = jest.fn();
      instance.handleBlur();
      jest.runAllTimers();
      expect(instance.handleCancel).toBeCalled();
    });
    it('handleBlur when cleared is true', () => {
      rendered.setState({ cleared: true });
      instance.handleBlur();
      jest.runAllTimers();
      expect(instance.state.cleared).toBe(false);
    });
    it('does nothing when autoSaveOnCancel is false', () => {
      rendered.setProps({ autoSaveOnBlur: false, autoSaveOnCancel: false });
      instance.handleCancel = jest.fn();
      instance.handleBlur();
      jest.runAllTimers();
      expect(instance.handleCancel).not.toBeCalled();
    });
    it('handleBlur when loading', () => {
      rendered.setState({ loading: true });
      instance.handleAutoSaveBlur = jest.fn();
      instance.handleBlur();
      jest.runAllTimers();
      expect(instance.handleAutoSaveBlur).not.toBeCalled();
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
    it('handleCancel', () => {
      const onCancel = jest.fn();
      rendered.setProps({
        onCancel: false,
      });
      instance.handleCancel();
      expect(onCancel).not.toHaveBeenCalled();
      expect(rendered.state().editing).toBe(false);
    });
    it('calls onCancel props if it exists', () => {
      const onCancel = jest.fn();
      rendered.setProps({
        onCancel,
      });
      instance.handleCancel();
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
