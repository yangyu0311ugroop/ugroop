/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import withValidation from '../index';

const onBlur = jest.fn();
const onChange = jest.fn();
const setValue = jest.fn();
const isValid = jest.fn();
const isValidValue = jest.fn(() => false);
const isAlwaysValidValue = jest.fn(() => true);
const testName = 'name test';
const debounceMs1 = 1000;
const getValueMock = () => errorMsg;
const errorMsg = 'error';
const getErrorMessageMock = () => errorMsg;
const getErrorMessageObjectMock = () => ({ errorMsg });
const isPristineMock = () => false;
const isRequiredMock = () => true;
const isFormDisabledMock = () => true;
const showErrorMock = () => errorMsg;
const isValidValueMock = () => false;
const hasValueMock = () => true;

function MockComponent() {
  return <input name={testName} />;
}
const WrapperComponent = withValidation(MockComponent);
const renderedComponent = shallow(
  <WrapperComponent
    onBlur={onBlur}
    onChange={onChange}
    setValue={setValue}
    isValid={isValid}
    getValue={getValueMock}
    hasValue={hasValueMock}
    getErrorMessage={getErrorMessageObjectMock}
  />,
);
const renderedComponent2 = shallow(
  <WrapperComponent
    debounceMs={debounceMs1}
    getErrorMessage={getErrorMessageMock}
    isPristine={isPristineMock}
    isRequired={isRequiredMock}
    isFormDisabled={isFormDisabledMock}
    showError={showErrorMock}
    isValid={isValid}
    isValidValue={isValidValueMock}
    getValue={getValueMock}
    hasValue={hasValueMock}
  />,
);
const renderedComponent1 = shallow(
  <WrapperComponent
    isValid={isValid}
    isValidValue={isValidValue}
    onBlur={onBlur}
    onChange={onChange}
    setValue={setValue}
    getValue={getValueMock}
    hasValue={hasValueMock}
    debounceMs={debounceMs1}
  />,
);

const renderedNoProps = shallow(
  <WrapperComponent
    isValid={isValid}
    isValidValue={isValidValue}
    setValue={setValue}
    getValue={getValueMock}
    hasValue={hasValueMock}
    debounceMs={debounceMs1}
  />,
);
const renderedAlwaysValid = shallow(
  <WrapperComponent
    isValid={isValid}
    isValidValue={isAlwaysValidValue}
    setValue={null}
    getValue={getValueMock}
    hasValue={hasValueMock}
    debounceMs={debounceMs1}
  />,
);

describe('<WithValidation />', () => {
  it('should exists', () => {
    expect(renderedComponent);
  });
  it('should render without exploding', () => {
    expect(renderedComponent).toBeDefined();
  });
  it('should render children', () => {
    const instance = renderedComponent.find(MockComponent);
    expect(instance.length).toBe(1);
    const props = instance.props();
    expect(props.value).toMatch('');
  });
});

describe('<WithValidation props />', () => {
  it('should be initiated', () => {
    const { props } = renderedComponent.instance();
    expect(props.debounceMs).toBe(500);
    expect(props.getErrorMessage()).toEqual({ errorMsg });
    expect(props.isPristine()).toBe(true);
    expect(props.isRequired()).toBe(false);
    expect(props.isFormDisabled()).toBe(false);
    expect(props.isFormSubmitted()).toBe(false);
    expect(props.showError()).toBe('');
    expect(props.isValidValue()).toBe(true);
  });
  it('should be initiated', () => {
    const { props } = renderedComponent2.instance();
    expect(props.debounceMs).toBe(debounceMs1);
    expect(props.getErrorMessage()).toBe(errorMsg);
    expect(props.isPristine()).toBe(false);
    expect(props.isRequired()).toBe(true);
    expect(props.isFormDisabled()).toBe(true);
    expect(props.showError()).toBe(errorMsg);
    expect(props.isValidValue()).toBe(false);
  });
});

describe('<WithValidation componentDidUpdate() />', () => {
  it('updates this.value if changed', () => {
    const getValue = () => 'newValue';
    renderedComponent.setProps({ value: 'newValue' });
    renderedComponent.setProps({ getValue });
    const input = renderedComponent.instance();
    input.value = 'oldValue';
    input.componentDidUpdate({ value: 'oldValue' });
    expect(input.value).toEqual('newValue');
  });
  it('not updates this.value if not changed', () => {
    const getValue = () => 'otherValue';
    renderedComponent.setProps({ value: 'newValue' });
    renderedComponent.setProps({ getValue });
    const input = renderedComponent.instance();
    input.value = 'otherValue';
    input.componentDidUpdate({ value: 'sameValue' });
    expect(input.value).toEqual('otherValue');
  });
});

describe('<WithValidation callback />', () => {
  it('onChange should be called', () => {
    const testValue = 'hello test';
    const input = renderedComponent.instance();
    input.handleChange({ target: { value: testValue } });
    expect(onChange).toHaveBeenCalledWith(testValue);
    expect(setValue).toHaveBeenCalledWith(testValue);
  });
  it('onChange should be called - with change value', () => {
    const testValue = 'hello test';
    const input = renderedComponent1.instance();
    input.changeValue = jest.fn();
    input.handleChange({ target: { value: testValue } });
    expect(input.changeValue).toBeCalled();
    expect(onChange).toHaveBeenCalledWith(testValue);
  });
  it('onChange should be called', () => {
    const testValue = 'hello test';
    const input = renderedComponent1.instance();
    input.handleChange({ target: { value: testValue } });
    expect(onChange).toHaveBeenCalledWith(testValue);
  });
  it('onChange should be called - no onChange', () => {
    const testValue = 'hello test';
    const input = renderedNoProps.instance();
    expect(() =>
      input.handleChange({ target: { value: testValue } }),
    ).not.toThrow();
  });
  it('onBlur should be called', () => {
    const testValue = 'hello test';
    const input = renderedComponent.instance();
    input.handleBlur({ target: { value: testValue } });
    expect(onBlur).toHaveBeenCalledWith(testValue);
  });
  it('changeValue should be cancelled', () => {
    const testValue = 'hello test';
    const input = renderedComponent.instance();
    input.changeValue = { cancel: jest.fn() };
    input.handleBlur({ target: { value: testValue } });
    expect(input.changeValue.cancel).toBeCalled();
  });
  it('missing props.onBlur is handled', () => {
    const testValue = 'hello test';
    const input = renderedNoProps.instance();
    expect(() =>
      input.handleBlur({ target: { value: testValue } }),
    ).not.toThrow();
  });
});

describe('<WithValidation handleChangeValue() />', () => {
  it('calls props.setValue() and props.onChange()', () => {
    const input = renderedComponent.instance();
    const value = 'value';
    input.handleChangeValue(value);
    expect(setValue).toBeCalledWith(value);
    expect(onChange).toBeCalledWith(value);
  });
  it('not explodes when no props.setValue() and props.onChange()', () => {
    const input = renderedAlwaysValid.instance();
    const value = 'value';
    expect(() => {
      input.handleChangeValue(value);
    }).not.toThrow();
  });
});

describe('<WithValidation handleChange() />', () => {
  it('onChange should be called', () => {
    const testValue = 'hello test';
    const input = renderedComponent.instance();
    input.handleChange({ target: { value: testValue } });
    expect(onChange).toHaveBeenCalledWith(testValue);
    expect(setValue).toHaveBeenCalledWith(testValue);
  });
  it('no onChange should not explode', () => {
    const testValue = 'hello test';
    const input = renderedAlwaysValid.instance();
    expect(() => {
      input.handleChange({ target: { value: testValue } });
    }).not.toThrow();
  });
});

describe('<WithValidation helperOrValid() />', () => {
  it('!isValid', () => {
    const input = renderedComponent.instance();
    const valid = () => false;
    const hasValue = () => true;
    const isPristine = () => true;
    const validText = null;
    const helpText = 'help';
    const errorText = 'error';
    const result = input.helperOrValid(
      valid,
      hasValue,
      isPristine,
      validText,
      helpText,
      errorText,
    );
    expect(result).toBe(errorText);
  });
  it('!hasValue && !isPristine', () => {
    const input = renderedComponent.instance();
    const valid = () => true;
    const hasValue = () => false;
    const isPristine = () => false;
    const validText = 'valid';
    const helpText = 'help';
    const errorText = 'error';
    const result = input.helperOrValid(
      valid,
      hasValue,
      isPristine,
      validText,
      helpText,
      errorText,
    );
    expect(result).toBe(validText);
  });
  it('!isPristine && !validText', () => {
    const input = renderedComponent.instance();
    const valid = () => true;
    const hasValue = () => true;
    const isPristine = () => false;
    const validText = null;
    const helpText = 'help';
    const errorText = 'error';
    const result = input.helperOrValid(
      valid,
      hasValue,
      isPristine,
      validText,
      helpText,
      errorText,
    );
    expect(result).toBe(helpText);
  });
});
