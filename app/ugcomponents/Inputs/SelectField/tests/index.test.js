/**
 * Created by stephenkarpinskyj on 2/6/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { SelectField } from '..';

describe('<SelectField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    options: [{ value: 'x', children: 'display' }],
    classes: { select: 'select', iconDisabled: 'iconDisabled' },
    isFormDisabled: () => false,
    getValue: jest.fn().mockImplementation(() => 'value'),
    setValue: jest.fn(),
    getErrorMessage: jest.fn(),
    showRequired: () => false,
  });

  beforeEach(() => {
    wrapper = shallow(<SelectField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(SelectField).toBeDefined();
  });

  describe('#componentDidMount()', () => {
    it('calls props.inputRef()', () => {
      wrapper.setProps({ inputRef: jest.fn() });
      instance.componentDidMount();
      expect(instance.props.inputRef).toBeCalledWith(instance);
    });
  });

  describe('#componentWillUnmount()', () => {
    it('calls props.inputRef()', () => {
      wrapper.setProps({ inputRef: jest.fn() });
      instance.componentWillUnmount();
      expect(instance.props.inputRef).toBeCalledWith(null);
    });

    it('not explodes when no props.inputRef()', () => {
      instance.componentWillUnmount();
      expect(() => {
        instance.componentWillUnmount();
      }).not.toThrow();
    });
  });

  describe('#getDefaultValue()', () => {
    it('returns existing props.value', () => {
      wrapper.setProps({ value: 'value ' });
      expect(instance.getDefaultValue()).toEqual(instance.props.value);
    });
  });

  describe('#getOptions()', () => {
    it('returns null', () => {
      expect(instance.getOptions(null)).toBe(null);
    });
  });

  describe('#isDisabled()', () => {
    it('returns true correctly', () => {
      wrapper.setProps({ isFormDisabled: () => true, disabled: false });
      expect(instance.isDisabled()).toBe(true);
      wrapper.setProps({ isFormDisabled: () => false, disabled: true });
      expect(instance.isDisabled()).toBe(true);
    });
  });

  describe('#getSelectClasses()', () => {
    it('still matches snapshot when disabled', () => {
      expect(
        instance.getSelectClasses(
          instance.props.classes,
          'selectClassName',
          true,
        ),
      ).toMatchSnapshot();
    });
  });

  describe('#getValue()', () => {
    it('returns this.value', () => {
      expect(instance.getValue()).toEqual(instance.props.getValue());
    });
  });

  describe('#handleChange()', () => {
    const value = 'value';
    const event = { target: { value } };

    it('handles correctly', () => {
      wrapper.setProps({ onChange: jest.fn() });
      instance.forceUpdate = jest.fn();
      instance.handleChange(event);
      expect(instance.value).toEqual(value);
      expect(instance.props.setValue).toBeCalledWith(value);
      expect(instance.props.onChange).toBeCalled();
      expect(instance.forceUpdate).toBeCalled();
    });

    it('not explodes with no props.onChange', () => {
      expect(() => {
        instance.handleChange(event);
      }).not.toThrow();
    });
  });

  describe('#renderLabel()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderLabel('Some label')).toMatchSnapshot();
    });
  });

  describe('#renderHelperText()', () => {
    it('still matches snapshot', () => {
      expect(
        instance.renderHelperText('Some error message', 'Some helper text'),
      ).toMatchSnapshot();
    });
  });

  describe('#renderNone()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderNone()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      instance.renderNone = jest.fn(() => 'renderNone');

      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders nothing when hidden', () => {
      wrapper.setProps({ type: 'hidden' });
      expect(instance.render()).toBeNull();
    });
  });
});
