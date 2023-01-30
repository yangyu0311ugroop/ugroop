/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MOMENT_HELPERS } from 'utils/helpers/moment';

import { TimeField } from '..';

describe('<TimeField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<TimeField {...makeProps()} />);
    instance = wrapper.instance();
  });

  describe('#getValue()', () => {
    it('returns moment', () => {
      const value = '2018-01-01T12:00:00.000Z';
      wrapper.setProps({ value });
      expect(instance.getValue()).toEqual(MOMENT_HELPERS.createUtc(value));
    });
  });

  it('exists', () => {
    expect(TimeField).toBeDefined();
  });

  describe('#addMinTimeFieldValidation()', () => {
    it('adds validation', () => {
      const minTimeField = 'minTimeField';
      wrapper.setProps({ minTimeField });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMinTimeFieldValidation(args)).toEqual({
        validations: { minTimeField },
        validationErrors: { minTimeField: 'Time is before minimum time' },
      });
    });
  });

  describe('#addMaxTimeFieldValidation()', () => {
    it('adds validation', () => {
      const maxTimeField = 'maxTimeField';
      wrapper.setProps({ maxTimeField });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMaxTimeFieldValidation(args)).toEqual({
        validations: { maxTimeField },
        validationErrors: { maxTimeField: 'Time is after maximum time' },
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
