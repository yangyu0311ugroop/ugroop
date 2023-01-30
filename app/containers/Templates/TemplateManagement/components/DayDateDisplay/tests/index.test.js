/**
 * Created by stephenkarpinskyj on 31/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { dateDisplay } from 'utils/constant';
import { DayDateDisplay } from '..';

describe('<DayDateDisplay />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    index: 1,
    startDate: '0001-02-03T12:34Z',
    displayDate: dateDisplay.startDate,
    weekDay: null,
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<DayDateDisplay {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DayDateDisplay).toBeDefined();
  });

  describe('#renderDayOnly()', () => {
    it('still matches snapshot', () => {
      const classes = { day: 'day' };
      expect(instance.renderDayOnly(classes, 'Day')).toMatchSnapshot();
    });
  });

  describe('#renderDayOnly()', () => {
    it('still matches snapshot', () => {
      const classes = { day: 'day', dot: 'dot', date: 'date' };
      expect(
        instance.renderDayAndDate(classes, 'Day', 'Date'),
      ).toMatchSnapshot();
    });
  });

  describe('#renderDayAndInfo()', () => {
    it('still matches snapshot', () => {
      const classes = { day: 'day', dot: 'dot' };
      expect(instance.renderDayAndInfo(classes, 'Day')).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('renders default', () => {
      const dayOnly = 'DAY_ONLY';
      wrapper.setProps({ displayDate: 'default' });
      instance.renderDayOnly = () => dayOnly;
      expect(instance.render()).toEqual(dayOnly);
    });

    it('renders day only', () => {
      const dayOnly = 'DAY_ONLY';
      wrapper.setProps({ displayDate: dateDisplay.none });
      instance.renderDayOnly = () => dayOnly;
      expect(instance.render()).toEqual(dayOnly);
    });

    it('renders day and info', () => {
      const dayAndInfo = 'DAY_AND_INFO';
      wrapper.setProps({ displayDate: dateDisplay.none, displayInfo: 'info' });
      instance.renderDayAndInfo = () => dayAndInfo;
      expect(instance.render()).toEqual(dayAndInfo);
    });

    it('renders day only if no date', () => {
      const dayOnly = 'DAY_ONLY';
      wrapper.setProps({ displayDate: dateDisplay.startDate });
      instance.renderDayOnly = () => dayOnly;
      expect(instance.render()).toEqual(dayOnly);
    });

    it('renders day and date', () => {
      const dayAndDate = 'DAY_AND_DATE';
      wrapper.setProps({
        displayDate: dateDisplay.startDate,
        startTime: 'startTime',
        displayInfo: 'info',
      });
      instance.renderDayAndDate = () => dayAndDate;
      expect(instance.render()).toEqual(dayAndDate);
    });
  });
});
