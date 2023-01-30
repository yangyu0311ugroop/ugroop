import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { PhoneTextField } from '../index';

describe('PhoneInput/tests/index.test.js', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <PhoneTextField
        classes={{}}
        labels={{}}
        metadata={{
          country_calling_codes: {},
        }}
        internationalIcon={jest.fn()}
        onChange={jest.fn()}
      />,
    );
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(PhoneTextField).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly with label', () => {
      rendered.setProps({ label: 'Some label' });
      instance.setState({ active: true });
      expect(instance.render()).toMatchSnapshot();
    });
  });

  describe('getInputComponent', () => {
    it('should return renderReadOnly if readOnly props is true', () => {
      rendered.setProps({
        readOnly: true,
      });

      instance.renderReadOnly = 'renderReadOnly';
      expect(instance.getInputComponent()).toBe(instance.renderReadOnly);
    });

    it('should return undefined if readOnly props is false', () => {
      rendered.setProps({
        readOnly: false,
      });

      expect(instance.getInputComponent()).toBe(undefined);
    });
  });

  describe('placeholder', () => {
    it('should render a placeholder', () => {
      rendered.setProps({ placeholder: 'This is a placeholder' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('value', () => {
    it('should accept a value', () => {
      rendered.setProps({ value: '+63 999 876 9611' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should call onChange', () => {
      const onChange = jest.fn();
      rendered.setProps({ onChange });
      instance.onChange('value');
      expect(onChange).toBeCalledWith({ target: { value: 'value' } });
    });
    it('should use default parameters', () => {
      const onChange = jest.fn();
      rendered.setProps({ onChange });
      instance.onChange();
      expect(onChange).toBeCalledWith({ target: { value: '' } });
    });
  });

  describe('renderReadOnly', () => {
    it('should return div having the value inside it', () => {
      const snapshot = shallow(
        <div>
          {instance.renderReadOnly({
            value: '777',
            metadata: {
              countries: [],
              country_calling_codes: [],
            },
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('checkValid', () => {
    it('should check if input is valid', () => {
      instance.checkIfValid = jest.fn(value => value);
      rendered.setProps({ value: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should check if input is invalid', () => {
      instance.checkIfValid = jest.fn(value => value);
      rendered.setProps({ value: false });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('toggle active', () => {
    it('should toggle active', () => {
      instance.toggleActive(true)();
      expect(rendered.state().active).toBe(true);
    });
  });

  describe('check if error', () => {
    it('should show error if field is empty', () => {
      const result = instance.checkIfError();
      expect(result).toBe(false);
    });
    it('should render error', () => {
      const result = instance.checkIfError('error message');
      expect(result).toBe('error message');
    });
  });

  describe('handleChange', () => {
    it('should be called', () => {
      instance.changeValue = jest.fn();
      instance.handleChange();
      expect(instance.changeValue).toBeCalled();
    });
    it('should debounce when it changes', () => {
      const testValue = 'value';
      instance.changeValue = jest.fn();
      instance.handleChange(testValue);
      expect(instance.changeValue).toBeCalled();
    });
    it('should be called with no changeValue', () => {
      const testValue = 'value';
      instance.changeValue = null;
      instance.handleChange(testValue);
      expect(instance.changeValue).not.toThrow();
    });
  });
});
