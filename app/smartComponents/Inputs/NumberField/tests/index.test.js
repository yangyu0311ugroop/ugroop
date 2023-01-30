/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NumberField } from '..';

describe('<NumberField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<NumberField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(NumberField).toBeDefined();
  });

  describe('#getMakeEmptyZeroProps()', () => {
    it('returns correct intercept functions', () => {
      wrapper.setProps({ makeEmptyZero: true });
      const args = { validations: {}, validationErrors: {} };
      const value = 'value';
      const {
        onInterceptValue,
        onInterceptSetValue,
      } = instance.getMakeEmptyZeroProps(args);
      expect(onInterceptValue(value)).toEqual(value);
      expect(onInterceptSetValue(value)).toEqual(value);
      expect(onInterceptValue('0')).toEqual(0);
      expect(onInterceptSetValue(null)).toEqual(0);
    });
  });

  describe('#addIsIntValidation()', () => {
    it('not adds validation', () => {
      wrapper.setProps({ isInt: false });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addIsIntValidation(args)).toEqual({
        validations: {},
        validationErrors: {},
      });
    });
  });

  describe('#addMinValidation()', () => {
    it('not adds validation', () => {
      wrapper.setProps({ min: Number.NaN });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMinValidation(args)).toEqual({
        validations: {},
        validationErrors: {},
      });
    });
  });

  describe('#addMaxValidation()', () => {
    it('adds validation', () => {
      wrapper.setProps({ max: 1 });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMaxValidation(args)).toEqual({
        validations: { isLessThanOrEqual: 1 },
        validationErrors: { isLessThanOrEqual: 'Must be 1 or lower' },
      });
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
});
