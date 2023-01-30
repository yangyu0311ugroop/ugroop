/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { BatchCreateDayRange } from '..';

describe('<BatchCreateDayRange />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    formCalculatedStartDayValue: '2018-01-01T12:00:00.000Z',
    formCalculatedEndDayValue: '2018-01-03T12:00:00.000Z',
    dayDates: [
      { id: 1, value: '2018-01-02T12:00:00.000Z' },
      { id: 2, value: '2018-01-04T12:00:00.000Z' },
    ],
  });

  beforeEach(() => {
    wrapper = shallow(<BatchCreateDayRange {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(BatchCreateDayRange).toBeDefined();
  });

  describe('#calculateEndDay()', () => {
    it('returns startDayValue if endDayValue is before', () => {
      const formCalculatedStartDayValue = '2018-01-02T12:00:00.000Z';
      const formCalculatedEndDayValue = '2018-01-01T12:00:00.000Z';
      wrapper.setProps({
        formCalculatedStartDayValue,
        formCalculatedEndDayValue,
      });
      expect(instance.calculateEndDay()).toEqual(formCalculatedStartDayValue);
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
