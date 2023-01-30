import { COMPLETED } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import momentjs from 'moment';
import React from 'react';
import { DUE_DATE_HELPERS } from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import { TEMPLATE } from 'utils/modelConstants';
import { moment } from 'utils';
import { BadgeDueDate } from '../index';

describe('<BadgeDueDate />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<BadgeDueDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BadgeDueDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call updateCalculatedDate', () => {
      rendered.setProps({ calculatedDate: 66 });
      instance.updateCalculatedDate = jest.fn(() => 'updateCalculatedDate');

      instance.componentDidMount();

      expect(instance.updateCalculatedDate).toBeCalledWith(66);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call updateCalculatedDate', () => {
      rendered.setProps({ calculatedDate: '1234-12-21 13:34:56.789' });
      instance.updateCalculatedDate = jest.fn(() => 'updateCalculatedDate');

      instance.componentWillReceiveProps({
        calculatedDate: '2345-12-22 14:34:56.789',
      });

      expect(instance.updateCalculatedDate).toBeCalledWith(
        '2345-12-22 14:34:56.789',
      );
    });
  });

  describe('updateCalculatedDate()', () => {
    it('should call resaga.setValue', () => {
      instance.updateCalculatedDate(99);

      expect(resaga.setValue).toBeCalledWith({ calculatedStartTimeValue: 99 });
    });
  });

  describe('status()', () => {
    it('should return pastDue', () => {
      rendered.setProps({ calculatedDate: momentjs().subtract(1, 'y') });

      expect(instance.status()).toEqual({ pastDue: true, dueSoon: false });
    });

    it('should return normal', () => {
      rendered.setProps({ calculatedDate: momentjs().add(1, 'y') });

      expect(instance.status()).toEqual({ pastDue: false, dueSoon: false });
    });

    it('should return normal if COMPLETED', () => {
      rendered.setProps({ status: COMPLETED });

      expect(instance.status()).toEqual({ pastDue: false, dueSoon: false });
    });
  });

  describe('renderDate()', () => {
    it('should return empty if hideText', () => {
      instance.hideText = jest.fn(() => true);

      expect(instance.renderDate()).toEqual('');
    });

    it('should return dueSoon', () => {
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: true }));
      moment.renderCalendarDueDate = jest.fn(() => 'renderCalendarDueDate');

      expect(instance.renderDate()).toEqual('renderCalendarDueDate');
    });

    it('should return pastDue', () => {
      instance.status = jest.fn(() => ({ pastDue: true, dueSoon: false }));
      moment.renderCalendarDueDate = jest.fn(() => 'renderCalendarDueDate');

      expect(instance.renderDate()).toEqual('renderCalendarDueDate');
    });

    it('should return null if !dueDate', () => {
      rendered.setProps({ dueDate: null });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));

      expect(instance.renderDate()).toBe(null);
    });

    it('should return null if !isUnset', () => {
      rendered.setProps({ dueDate: { mode: 'mode', value: 'some value' } });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));
      DUE_DATE_HELPERS.isUnset = jest.fn(() => true);

      expect(instance.renderDate()).toBe(null);
    });

    it('should return isFixedWithTime', () => {
      rendered.setProps({ dueDate: { mode: 'mode', value: 'some value' } });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));
      DUE_DATE_HELPERS.isUnset = jest.fn(() => false);
      DUE_DATE_HELPERS.isFixedWithTime = jest.fn(() => true);
      moment.renderCalendarDateShort = jest.fn(() => 'renderCalendarDateShort');

      expect(instance.renderDate()).toBe('renderCalendarDateShort');
    });

    it('should return isFixedNoTime', () => {
      rendered.setProps({ dueDate: { mode: 'mode', value: 'some value' } });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));
      DUE_DATE_HELPERS.isUnset = jest.fn(() => false);
      DUE_DATE_HELPERS.isFixedWithTime = jest.fn(() => false);
      DUE_DATE_HELPERS.isFixedNoTime = jest.fn(() => true);
      moment.renderCalendarDateShort = jest.fn(() => 'renderCalendarDateShort');

      expect(instance.renderDate()).toBe('renderCalendarDateShort');
    });

    it('should renderDateDuration', () => {
      rendered.setProps({ dueDate: { mode: 'mode', value: 'some value' } });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));
      instance.renderDateDuration = jest.fn(() => 'renderDateDuration');
      DUE_DATE_HELPERS.isUnset = jest.fn(() => false);
      DUE_DATE_HELPERS.isFixedWithTime = jest.fn(() => false);
      DUE_DATE_HELPERS.isFixedNoTime = jest.fn(() => false);
      moment.renderCalendarDateShort = jest.fn(() => 'renderCalendarDateShort');

      expect(instance.renderDate()).toBe('renderDateDuration');
    });
  });

  describe('renderDateDuration()', () => {
    it('should renderDateDuration', () => {
      instance.renderCalculatedDate = jest.fn(() => 'renderCalculatedDate');
      instance.humaniseDuration = jest.fn(() => 'humaniseDuration');

      const snapshot = shallow(<div>{instance.renderDateDuration()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderDateDuration as actual', () => {
      rendered.setProps({ parentType: TEMPLATE, dueDate: { value: 'P1D' } });
      instance.renderCalculatedDate = jest.fn(() => 'renderCalculatedDate');
      instance.humaniseDuration = jest.fn(() => 'humaniseDuration');

      const snapshot = shallow(<div>{instance.renderDateDuration()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      const snapshot = shallow(<div>{instance.renderEmpty()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTitle()', () => {
    it('should return null #1', () => {
      rendered.setProps({ calculatedDate: null });

      expect(instance.renderTitle()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ dueDate: null });

      expect(instance.renderTitle()).toBe(null);
    });
    it('should renderDayDateTimeZone', () => {
      moment.renderCalendarDate = jest.fn(() => 'moment.renderCalendarDate');
      rendered.setProps({
        calculatedDate: 'calculatedDate',
        dueDate: { mode: 'fixedDate', value: 'some value' },
      });
      DUE_DATE_HELPERS.isFixedWithTime = jest.fn(() => false);
      DUE_DATE_HELPERS.isFixedNoTime = jest.fn(() => true);

      moment.renderDayDateTimeZone = jest.fn(
        () => 'moment.renderDayDateTimeZone',
      );

      expect(instance.renderTitle()).toBe('moment.renderCalendarDate');
    });
  });

  describe('renderDefault()', () => {
    beforeEach(() => {
      instance.renderTitle = jest.fn(() => 'renderTitle');
      moment.renderFromNow = jest.fn(() => 'renderFromNow');
      moment.renderCurrentDayDateTimeZone = jest.fn(
        () => 'renderCurrentDayDateTimeZone',
      );
    });

    it('should renderEmpty', () => {
      rendered.setProps({ dueDate: null });
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.renderDefault()).toBe('renderEmpty');
    });

    it('should render hideText', () => {
      rendered.setProps({ dueDate: {}, status: COMPLETED, showTime: false });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render dueSoon', () => {
      rendered.setProps({ dueDate: {}, completed: true });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: true }));

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render past due', () => {
      rendered.setProps({ dueDate: {} });
      instance.status = jest.fn(() => ({ pastDue: true, dueSoon: false }));

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render normal date', () => {
      rendered.setProps({ dueDate: {}, showTime: true });
      instance.status = jest.fn(() => ({ pastDue: false, dueSoon: false }));
      moment.renderDayDate = jest.fn(() => 'renderDayDate');
      moment.renderCalendarDateShort = jest.fn(() => 'renderCalendarDateShort');
      moment.renderTime = jest.fn(() => 'renderTime');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
