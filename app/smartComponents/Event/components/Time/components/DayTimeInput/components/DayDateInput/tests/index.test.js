/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DayDateInput } from '..';

describe('<DayDateInput />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    resaga: {
      dispatchTo: jest.fn(),
    },
    inputs: {
      tempDay: { name: 'tempDay' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<DayDateInput {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(DayDateInput).toBeDefined();
  });

  describe('#getValue()', () => {
    it('returns props.value', () => {
      const options = [];
      wrapper.setProps({ value: '2018-01-01T12:00:00.000Z' });
      expect(instance.getValue(options)).toEqual('2018-01-01T00:00:00.000Z');
    });

    it('returns first value', () => {
      const value = 'value';
      const options = [{ value }];
      expect(instance.getValue(options)).toEqual(value);
    });

    it('returns found value', () => {
      const options = [
        { value: 'value' },
        { value: '2018-01-01T00:00:00.000Z' },
      ];
      wrapper.setProps({ value: '2018-01-01T12:00:00.000Z' });
      expect(instance.getValue(options)).toEqual('2018-01-01T00:00:00.000Z');
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
        DayDateInput.defaultProps.renderDate();
      }).not.toThrow();
    });
  });
});
