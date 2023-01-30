/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DurationField } from '..';

describe('<DurationField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<DurationField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(DurationField).toBeDefined();
  });

  describe('#addIsDurationPositiveValidation()', () => {
    it('not adds validation', () => {
      wrapper.setProps({ isDurationPositive: false });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addIsDurationPositiveValidation(args)).toEqual({
        validations: {},
        validationErrors: {},
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
