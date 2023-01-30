/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TextField } from '..';

describe('<TextField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<TextField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(TextField).toBeDefined();
  });

  describe('#addMinLengthValidation()', () => {
    it('adds validation', () => {
      const minLength = 1;
      wrapper.setProps({ minLength });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMinLengthValidation(args)).toEqual({
        validations: { minLength },
        validationErrors: { minLength: 'Must be at least 1 characters long' },
      });
    });
  });

  describe('#addMaxLengthValidation()', () => {
    it('adds validation', () => {
      const maxLength = 1;
      wrapper.setProps({ maxLength });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMaxLengthValidation(args)).toEqual({
        validations: { maxLength },
        validationErrors: { maxLength: 'Must not be longer than 1 characters' },
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
