/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DayDurationInput } from '..';

describe('<DayDurationInput />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    inputs: {
      tempDay: { name: 'tempDay' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<DayDurationInput {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(DayDurationInput).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns props.value', () => {
      const options = [];
      wrapper.setProps({ value: 'P1D' });
      expect(instance.getValue(options)).toEqual('P1D');
    });

    it('returns first value', () => {
      const value = 'value';
      const options = [{ value }];
      expect(instance.getValue(options)).toEqual(value);
    });

    it('returns found value', () => {
      const options = [{ value: 'value' }, { value: 'P1D' }];
      wrapper.setProps({ value: 'P1D' });
      expect(instance.getValue(options)).toEqual('P1D');
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
    it('#renderDate()', () => {
      expect(() => {
        DayDurationInput.defaultProps.renderDate();
      }).not.toThrow();
    });
  });
});
