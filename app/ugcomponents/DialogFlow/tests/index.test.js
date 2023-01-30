import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DialogFlowContainer from '../index';

describe('DialogFlowContainer', () => {
  let rendered;
  let instance;
  let mockOnClose;
  let mockOnSave;
  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnSave = jest.fn();
    rendered = shallow(
      <DialogFlowContainer onClose={mockOnClose} onSave={mockOnSave} />,
    );
    instance = rendered.instance();
  });
  describe('componentWillReceiveProps', () => {
    it('should call checkIfDiscardButtonToBeHidden function if isManuallyControlled is false', () => {
      instance.checkIfDiscardButtonToBeHidden = jest.fn();
      instance.componentWillReceiveProps({
        something: 2,
        isManuallyControlled: false,
        inputToBeValidated: {},
      });
      expect(instance.checkIfDiscardButtonToBeHidden).toBeCalledWith({});
    });
    it('should not call checkIfDiscardButtonToBeHidden function if isManuallyControlled is true', () => {
      instance.checkIfDiscardButtonToBeHidden = jest.fn();
      instance.componentWillReceiveProps({
        something: 1,
        isManuallyControlled: true,
      });
      expect(instance.checkIfDiscardButtonToBeHidden).not.toBeCalled();
    });
  });
  describe('onDiscardBtnClick', () => {
    it('should set the state for prompt to true', () => {
      instance.onDiscardBtnClick();
      expect(rendered.state().isBeingDiscarded).toBeTruthy();
    });
  });
  describe('onNotToBeDiscarded', () => {
    it('should set the state for prompt to be false', () => {
      rendered.setState({
        isBeingDiscarded: true,
      });
      instance.onNotToBeDiscarded();
      expect(rendered.state().isBeingDiscarded).not.toBeTruthy();
    });
  });
  describe('onToBeDiscarded', () => {
    describe('is being manually controlled', () => {
      it('should only call onClose function prop and not set props', () => {
        rendered.setProps({
          isManuallyControlled: true,
        });
        rendered.setState({
          isBeingDiscarded: true,
        });
        instance.onToBeDiscarded();
        expect(mockOnClose).toBeCalled();
        expect(rendered.state().isBeingDiscarded).toBeTruthy();
      });
    });
    describe('not being manually controlled', () => {
      it('should reset all the state and call onClose function', () => {
        rendered.setState({
          isBeingDiscarded: true,
          isDiscardBtnHidden: false,
          isXBtnHidden: true,
        });
        instance.onToBeDiscarded();
        const expectedState = {
          isBeingDiscarded: false,
          isDiscardBtnHidden: true,
          isXBtnHidden: false,
        };
        expect(mockOnClose).toBeCalled();
        expect(rendered.state()).toEqual(expectedState);
      });
    });
  });
  describe('validateInput', () => {
    it('should return false if input is or null', () => {
      const component = rendered.instance();
      const actualResult = component.validateInput(null);
      expect(actualResult).not.toBeTruthy();
    });
    it('should return true if input is not null', () => {
      const component = rendered.instance();
      const actualResult = component.validateInput('King of kings');
      expect(actualResult).toBeTruthy();
    });
    it('should return false if input is empty string', () => {
      const component = rendered.instance();
      const actualResult = component.validateInput('');
      expect(actualResult).not.toBeTruthy();
    });
    it('should call onHookSingleValidation props passing the input and let the props dictate the return value this function', () => {
      const customValidator = jest.fn(() => true);
      rendered.setProps({
        onHookSingleValidation: customValidator,
      });
      const component = rendered.instance();
      const actualResult = component.validateInput('sampleInput', 'sampleKey');
      expect(customValidator).toBeCalledWith('sampleInput', 'sampleKey', true);
      expect(actualResult).toBeTruthy();
    });
  });
  describe('acceptAtleastOneValid', () => {
    it('should return true if at least one of the inputs are valid', () => {
      const actualResult = instance.acceptAtleastOneValid({
        input: '',
        input2: 'qweqweqwe',
      });
      expect(actualResult).toBeTruthy();
    });
  });
  describe('acceptOnceAllIsValid', () => {
    it('should return true only if all inputs are valid', () => {
      const actualResult = instance.acceptOnceAllIsValid({
        input: 'qweqwe',
        input2: 'qqqq',
      });
      expect(actualResult).toBeTruthy();
    });
    it('should return false if one of the inputs are not valid', () => {
      const actualResult = instance.acceptOnceAllIsValid({
        input: '',
        input2: 'qqqq',
      });
      expect(actualResult).not.toBeTruthy();
    });
  });
  describe('checkIfDiscardButtonToBeHidden', () => {
    it('should set the state of xbtn state and discard btn state to false if input passed is an empty object', () => {
      instance.checkIfDiscardButtonToBeHidden({});
      expect(rendered.state().isDiscardBtnHidden).toBeTruthy();
      expect(rendered.state().isXBtnHidden).not.toBeTruthy();
    });
    it('should use acceptOnceAllIsValid if checkAllInput props is true', () => {
      rendered.setProps({
        checkAllInput: true,
      });
      instance.acceptOnceAllIsValid = jest.fn();
      instance.checkIfDiscardButtonToBeHidden({});
      expect(instance.acceptOnceAllIsValid).toBeCalled();
    });
    it('should use acceptAtleastOneValid if checkAllInput props is false', () => {
      rendered.setProps({
        checkAllInput: false,
      });
      instance.acceptAtleastOneValid = jest.fn();
      instance.checkIfDiscardButtonToBeHidden({});
      expect(instance.acceptAtleastOneValid).toBeCalled();
    });
    it('should set the state of xbtn to be true and discard btn state to false if input passed are all valid', () => {
      instance.checkIfDiscardButtonToBeHidden({
        input: 'qweqwe',
        input2: 'qq',
      });
      expect(rendered.state().isDiscardBtnHidden).not.toBeTruthy();
      expect(rendered.state().isXBtnHidden).toBeTruthy();
    });
    it('should use customValidator if customValidator prop exist', () => {
      const mFunc = jest.fn();
      rendered.setProps({
        customValidator: mFunc,
      });
      instance.checkIfDiscardButtonToBeHidden({
        input: 'qweqwe',
        input2: 'qq',
      });
      expect(mFunc).toBeCalled();
    });
    it('should call onValidated props and pass the result of the validation', () => {
      const mFunc = jest.fn();
      rendered.setProps({
        onValidated: mFunc,
        checkAllInput: true,
      });
      instance.acceptOnceAllIsValid = jest.fn(() => true);
      instance.checkIfDiscardButtonToBeHidden({
        input: 'qweqwe',
      });
      expect(mFunc).toBeCalledWith(true);
    });
  });
  describe('render', () => {
    it('should render what it should render', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
