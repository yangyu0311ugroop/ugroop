/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { INPUT_CONSTANTS } from 'ugcomponents/Inputs';

import { DateField } from '..';

describe('<DateField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    name: 'name',
  });

  beforeEach(() => {
    wrapper = shallow(<DateField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(DateField).toBeDefined();
  });

  describe('#addMinDateValidation()', () => {
    it('not adds validation', () => {
      wrapper.setProps({ minDate: null });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMinDateValidation(args)).toEqual({
        validations: {},
        validationErrors: {},
      });
    });
  });

  describe('#addMaxDateValidation()', () => {
    it('adds validation', () => {
      const maxDate = '2018-01-01T12:00:00.000Z';
      wrapper.setProps({ maxDate });
      const args = { validations: {}, validationErrors: {} };
      expect(instance.addMaxDateValidation(args)).toEqual({
        validationErrors: {
          maxDate: INPUT_CONSTANTS.DATE_MAX_ERROR(
            maxDate,
            instance.props.displayFormat,
          ),
        },
        validations: { maxDate },
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
