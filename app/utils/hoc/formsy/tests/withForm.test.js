import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import withForm from '../withForm';

describe('utils/hoc/formsy/withForm', () => {
  class MockComponent extends Component {
    componentDidMount = () => {};

    render = () => <div />;
  }

  let Hoc;
  let wrapper;
  let instance;

  beforeEach(() => {
    Hoc = withForm()(MockComponent);
    wrapper = shallow(<Hoc />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(withForm).toBeDefined();
  });

  describe('#makeInitialState()', () => {
    it('still matches snapshot', () => {
      expect(withForm()().makeInitialState()).toMatchSnapshot();
    });
  });

  describe('#getOptionalProps()', () => {
    it('not includes renderForm prop if not config.manualRenderForm', () => {
      expect(instance.getOptionalProps()).not.toEqual(
        expect.objectContaining({
          renderForm: instance.renderForm,
        }),
      );
    });
    it('includes renderForm prop if config.manualRenderForm', () => {
      const Hoc2 = withForm({ manualRenderForm: true })(MockComponent);
      const manualRenderFormWrapper = shallow(<Hoc2 />);
      const manualRenderFormInstance = manualRenderFormWrapper.instance();
      expect(manualRenderFormInstance.getOptionalProps()).toEqual(
        expect.objectContaining({
          renderForm: manualRenderFormInstance.renderFormWithContextProvider,
        }),
      );
    });
  });

  describe('#canSubmitForm()', () => {
    it('returns true correctly', () => {
      wrapper.setProps({ canSubmitForm: true });
      instance.setState({ canSubmitForm: true });
      expect(instance.canSubmitForm()).toBeTruthy();
    });
  });

  describe('#submitForm()', () => {
    it('calls form.submit()', () => {
      instance.form = { submit: jest.fn() };
      instance.submitForm();
      expect(instance.form.submit).toBeCalled();
    });
  });

  describe('#cancelForm()', () => {
    it('sets state.discarding by default', () => {
      instance.setState = jest.fn();
      instance.cancelForm()();
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({ discarding: true }),
      );
    });
    it('calls handleConfirmDiscard if not confirm', () => {
      instance.handleConfirmDiscard = jest.fn();
      instance.cancelForm(false)();
      expect(instance.handleConfirmDiscard).toBeCalled();
    });
  });

  describe('#resetForm()', () => {
    beforeEach(() => {
      instance.form = { reset: jest.fn() };
    });

    it('resets form while keeping current values', () => {
      const values = { x: 1 };
      instance.currentValues = { y: 2 };
      const spreadCurrentValuesFirst = true;
      instance.resetForm(values, spreadCurrentValuesFirst);
      expect(instance.form.reset).toBeCalledWith({
        ...instance.currentValues,
        ...values,
      });
    });
    it('resets form with new values only', () => {
      const values = { x: 1 };
      instance.currentValues = { y: 2 };
      instance.resetForm(values);
      expect(instance.form.reset).toBeCalledWith({
        ...values,
      });
    });
    it('resets form with no values', () => {
      instance.currentValues = { y: 2 };
      instance.resetForm();
      expect(instance.form.reset).toBeCalledWith({});
    });
  });

  describe('handleBeforeUnload', () => {
    it('should just return true', () => {
      expect(instance.handleBeforeUnload()).toBe(true);
    });
  });

  describe('#handleRef()', () => {
    let currentValues;
    let ref;

    beforeEach(() => {
      currentValues = { x: 1 };
      ref = { getCurrentValues: () => currentValues };
      instance.handleRef(ref);
    });

    it('sets form with ref', () => {
      expect(instance.form).toMatchObject(ref);
    });

    it('resets state', () => {
      expect(instance.state).toMatchObject(withForm()().makeInitialState());
    });

    it('sets currentValues', () => {
      expect(instance.currentValues).toMatchObject(currentValues);
    });

    it('does nothing if missing ref', () => {
      instance.currentValues = null;
      instance.setState = jest.fn();
      instance.handleRef();
      expect(instance.setState).not.toBeCalled();
      expect(instance.currentValues).toBeNull();
    });
  });

  describe('#handleChange()', () => {
    let currentValues;
    let thisCurrentValues;
    let isChanged;

    beforeEach(() => {
      currentValues = { x: 2 };
      thisCurrentValues = { x: 3 };
      isChanged = true;
      wrapper.setProps({ onFormChange: jest.fn() });
      instance.currentValues = thisCurrentValues;
      instance.form = { reset: () => {}, updateInputsWithError: () => {} };
      instance.setState = jest.fn();
      instance.handleChange(currentValues, isChanged);
    });

    it('updates previousValues and currentValues', () => {
      expect(instance.previousValues).toMatchObject(thisCurrentValues);
      expect(instance.currentValues).toMatchObject(currentValues);
    });
    it('calls props.onFormChange() if given', () => {
      const args = {
        previousValues: thisCurrentValues,
        currentValues,
        isChanged,
        resetForm: instance.form.reset,
        invalidateForm: instance.form.updateInputsWithError,
      };
      expect(instance.props.onFormChange).toBeCalledWith(
        expect.objectContaining(args),
      );
    });
    it('handles missing props.onFormChange()', () => {
      wrapper.setProps({ onFormChange: null });
      expect(() => instance.handleChange()).not.toThrow();
    });
    it('sets state.isFormChanged', () => {
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({ isFormChanged: isChanged }),
      );
    });
  });

  describe('#handleValidSubmit()', () => {
    beforeEach(() => {
      wrapper.setProps({ onFormValidSubmit: jest.fn() });
    });

    it('calls props.onFormValidSubmit() if given', () => {
      const args = { model: {}, resetForm: () => {}, invalidateForm: () => {} };
      const isFormChanged = true;
      instance.setState({ isFormChanged });
      instance.handleValidSubmit(
        args.model,
        args.resetForm,
        args.invalidateForm,
      );
      expect(instance.props.onFormValidSubmit).toBeCalledWith(
        expect.objectContaining({ ...args, isChanged: isFormChanged }),
      );
    });
    it('handles missing props.onFormValidSubmit()', () => {
      wrapper.setProps({ onFormValidSubmit: null });
      expect(() => instance.handleValidSubmit()).not.toThrow();
    });
  });

  describe('#handleConfirmDiscard()', () => {
    beforeEach(() => {
      instance.setState = jest.fn();
      wrapper.setProps({ onCancel: jest.fn() });
      instance.handleConfirmDiscard();
    });

    it('unsets state.isDiscarding', () => {
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({ discarding: false }),
      );
    });
    it('calls props.onCancel()', () => {
      expect(instance.props.onCancel).toBeCalled();
    });
    it('handles no props.onCancel()', () => {
      wrapper.setProps({ onCancel: null });
      expect(() => instance.handleConfirmDiscard()).not.toThrow();
    });
  });

  describe('#handleCancelDiscard()', () => {
    beforeEach(() => {
      instance.setState = jest.fn();
      instance.handleCancelDiscard();
    });

    it('unsets state.isDiscarding', () => {
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({ discarding: false }),
      );
    });
  });

  describe('#renderSubmitButton()', () => {
    it('handles no props', () => {
      expect(() => instance.renderSubmitButton()).not.toThrow();
    });
  });

  describe('#renderCancelButton()', () => {
    it('handles no props', () => {
      instance.setState({ isFormChanged: true });
      expect(() => instance.renderCancelButton()).not.toThrow();
    });
    it('renders null matches snapshot when form not changed', () => {
      instance.setState({ isFormChanged: false });
      expect(instance.renderCancelButton()).toBeNull();
    });
  });

  describe('#renderParent()', () => {
    it('renders children only if config.manualRenderForm', () => {
      const Hoc2 = withForm({ manualRenderForm: true })(MockComponent);
      const manualRenderFormWrapper = shallow(<Hoc2 />);
      const manualRenderFormInstance = manualRenderFormWrapper.instance();
      const children = 'children';
      expect(manualRenderFormInstance.renderParent(children)).toBe(children);
    });
  });

  describe('#renderForm()', () => {
    let formWrapper;
    let formInstance;

    beforeEach(() => {
      instance.setState = jest.fn();
      wrapper.setProps({
        onValid: jest.fn(),
        onInvalid: jest.fn(),
        onValidSubmit: jest.fn(),
        onChange: jest.fn(),
      });
      formWrapper = shallow(instance.renderForm('Children'));
      formInstance = formWrapper.instance();
    });

    describe('#onValid()', () => {
      it('calls props.onValid()', () => {
        formInstance.props.onValid();
        expect(instance.props.onValid).toBeCalled();
      });
    });

    describe('#onInvalid()', () => {
      it('calls props.onInvalid()', () => {
        formInstance.props.onInvalid();
        expect(instance.props.onInvalid).toBeCalled();
      });
    });

    describe('#onValidSubmit()', () => {
      it('calls handleValidSubmit()', () => {
        instance.handleValidSubmit = jest.fn();
        formInstance.props.onValidSubmit();
        expect(instance.handleValidSubmit).toBeCalled();
      });
      it('calls props.onValidSubmit()', () => {
        formInstance.props.onValidSubmit();
        expect(instance.props.onValidSubmit).toBeCalled();
      });
      it('handles missing props.onValidSubmit()', () => {
        wrapper.setProps({ onValidSubmit: null });
        formWrapper = shallow(instance.renderForm());
        formInstance = formWrapper.instance();
        expect(formInstance.props.onValidSubmit).not.toThrow();
      });
    });

    describe('#onChange()', () => {
      it('calls handleChange()', () => {
        instance.handleChange = jest.fn();
        formInstance.props.onChange();
        expect(instance.handleChange).toBeCalled();
      });
      it('calls props.onChange()', () => {
        formInstance.props.onChange();
        expect(instance.props.onChange).toBeCalled();
      });
      it('handles missing props.onChange()', () => {
        wrapper.setProps({ onChange: null });
        formWrapper = shallow(instance.renderForm());
        formInstance = formWrapper.instance();
        expect(formInstance.props.onChange).not.toThrow();
      });
    });
  });

  describe('#renderWrapped()', () => {
    it('props still matches snapshot', () => {
      expect(instance.renderWrapped().props).toMatchSnapshot();
    });

    it('should add prompt is showChangeRoutePrompt to true', () => {
      wrapper.setProps({
        showChangeRoutePrompt: true,
      });
      instance.renderParent = jest.fn(children => children);
      const snapshot = shallow(<div>{instance.renderWrapped()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderDiscardConfirmationDialog()', () => {
    let discardWrapper;

    beforeEach(() => {
      instance.setState = jest.fn();
      wrapper.setProps({ onCancel: jest.fn() });

      discardWrapper = shallow(instance.renderDiscardConfirmationDialog());
    });

    it('still matches snapshot', () => {
      discardWrapper.setProps({ discardDialogProps: { x: 1 } });
      expect(toJSON(discardWrapper)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it("doesn't explode", () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onValid()', () => {
      expect(() => {
        Hoc.defaultProps.onValid();
      }).not.toThrow();
    });

    it('#onInvalid()', () => {
      expect(() => {
        Hoc.defaultProps.onInvalid();
      }).not.toThrow();
    });
  });
});
