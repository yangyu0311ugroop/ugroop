/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SIZE_CONSTANTS } from 'sizeConstants';

import { CheckboxField } from '..';

describe('<CheckboxField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    isFormDisabled: () => true,
    compact: true,
    getValue: () => true,
    setValue: jest.fn(),
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<CheckboxField {...makeProps()} />);
    instance = wrapper.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(CheckboxField).toBeDefined();
  });

  describe('#getIconSize()', () => {
    it('returns correctly if props.size=SM', () => {
      wrapper.setProps({ size: SIZE_CONSTANTS.SM });
      expect(instance.getIconSize()).toEqual('medium');
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

  describe('#handleChange()', () => {
    const event = { target: { checked: true } };

    it('sets value', () => {
      instance.handleChange(event);
      expect(instance.props.setValue).toHaveBeenCalledWith(
        event.target.checked,
      );
    });

    it('calls forceUpdate()', () => {
      const onChange = jest.fn();
      wrapper.setProps({ onChange });
      instance.forceUpdate = jest.fn();

      instance.handleChange(event);
      expect(instance.forceUpdate).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('#isChecked()', () => {
    it('return currentValue', () => {
      wrapper.setProps({ currentValue: true });

      expect(instance.isChecked()).toBe(true);
    });

    it('return currentValue - default value', () => {
      wrapper.setProps({ currentValue: false });

      expect(instance.isChecked()).toBe(false);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot when disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });

    it('still matches snapshot when value is not true', () => {
      wrapper.setProps({ getValue: () => null });
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });

    it('renders nothing when hidden', () => {
      wrapper.setProps({ type: 'hidden' });
      expect(instance.render()).toBeNull();
    });

    it('renders properly if label is function', () => {
      wrapper.setProps({
        label: () => '',
      });
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });
  });
});
