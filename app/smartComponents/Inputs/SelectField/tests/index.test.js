/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { SelectField } from '..';

describe('<SelectField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    getValue: jest.fn(),
    setValue: jest.fn(),
    name: 'some.name',
    options: [],
  });

  beforeEach(() => {
    wrapper = shallow(<SelectField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(SelectField).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns currentValue if present', () => {
      const currentValue = 'currentValue';
      wrapper.setProps({ currentValue });
      expect(instance.getValue()).toEqual(currentValue);
    });
  });

  describe('#handleChange()', () => {
    it('calls props.setValue', () => {
      const value = 'value';
      instance.handleChange({ target: { value } });
      expect(instance.props.setValue).toBeCalledWith(value);
    });

    it('calls props.onChange', () => {
      const value = 'value';
      wrapper.setProps({ onChange: jest.fn() });
      instance.handleChange({ target: { value } });
      expect(instance.props.onChange).toBeCalledWith(value);
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

  describe('#defaultProps', () => {
    it('#onChange()', () => {
      expect(() => {
        SelectField.defaultProps.onChange();
      }).not.toThrow();
    });
  });
});
