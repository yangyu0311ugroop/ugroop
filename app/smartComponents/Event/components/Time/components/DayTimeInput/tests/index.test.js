/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import DaySelectInput from '../components/DaySelectInput';
import DayDateInput from '../components/DayDateInput';
import DayDurationInput from '../components/DayDurationInput';
import { DayTimeInput } from '..';

describe('<DayTimeInput />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    resaga: {
      dispatchTo: jest.fn(),
    },
    inputs: {
      mode: { name: 'mode' },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<DayTimeInput {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(DayTimeInput).toBeDefined();
  });

  describe('#getDayInputComponent()', () => {
    it('returns DaySelectInput if formBatchCreate', () => {
      wrapper.setProps({ formBatchCreate: true });
      expect(instance.getDayInputComponent()).toBe(DaySelectInput);
    });

    it('returns DayDateInput if mode is fixed', () => {
      wrapper.setProps({ mode: NODE_CONSTANTS.TIME_MODES.fixedDate });
      expect(instance.getDayInputComponent()).toBe(DayDateInput);
    });

    it('returns DaySelectInput if relativeToStart', () => {
      wrapper.setProps({ position: NODE_CONSTANTS.POSITIONS.start });
      expect(instance.getDayInputComponent()).toBe(DaySelectInput);
    });

    it('returns DayDurationInput by default', () => {
      expect(instance.getDayInputComponent()).toBe(DayDurationInput);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if props.singleColumn', () => {
      wrapper.setProps({ singleColumn: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
