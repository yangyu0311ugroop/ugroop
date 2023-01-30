/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { TimeInput } from '..';

describe('<TimeInput />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    inputs: {
      tempTime: { name: 'tempTime' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<TimeInput {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(TimeInput).toBeDefined();
  });

  describe('#getFixedValue()', () => {
    it('returns value if has time', () => {
      const value = '2018-01-01T12:00:00.000Z';
      wrapper.setProps({
        mode: NODE_CONSTANTS.TIME_MODES.relativeAtTime,
        value,
      });
      const result = instance.getFixedValue();
      expect(result).toEqual(value);
    });
  });

  describe('#getRelativeValue()', () => {
    it('returns empty string if no time', () => {
      wrapper.setProps({ mode: NODE_CONSTANTS.TIME_MODES.relative });
      expect(instance.getValue()).toEqual('');
    });
  });

  describe('#getValue()', () => {
    it('returns fixed value', () => {
      wrapper.setProps({ mode: NODE_CONSTANTS.TIME_MODES.fixedDate });
      expect(instance.getValue()).toEqual('');
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
