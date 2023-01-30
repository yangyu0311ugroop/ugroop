import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import momentjs from 'moment';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { StartDate } from '../index';

describe('<StartDate />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };
  const location = {
    search: {},
  };

  const date = '2018-05-28T16:23:45.6789';
  const startDate = momentjs.utc(date);

  const props = {
    classes: { default: 'default' },
    resaga,
    history,
    location,
    id: 1,
    startDate,
  };

  beforeEach(() => {
    rendered = shallow(<StartDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(StartDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('updateTimes()', () => {
    it('should updateTimes()', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();
      instance.updateTimes();
      TEST_HELPERS.expectCalledAndMatchSnapshot(
        NODE_API_HELPERS.getTreeAndTimes,
      );
    });
  });

  describe('changeStartDate()', () => {
    it('should changeStartDate()', () => {
      instance.changeStartDate();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
  });

  describe('handlePickDate()', () => {
    it('should return null', () => {
      expect(instance.handlePickDate(momentjs.utc(date))).toBe(null);
    });

    it('should handlePickDate()', () => {
      instance.changeStartDate = jest.fn(() => 'changeStartDate');
      const newDate = '2018-05-29T16:23:45.6789';

      expect(instance.handlePickDate(momentjs.utc(newDate))).toBe(
        'changeStartDate',
      );

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.changeStartDate);
    });
  });

  describe('handlePickerRef()', () => {
    it('should handlePickerRef()', () => {
      instance.handlePickerRef(11223);

      expect(instance.picker).toBe(11223);
    });
  });

  describe('handlePickWeekDay()', () => {
    it('should handlePickWeekDay()', () => {
      instance.changeStartDate = jest.fn();

      instance.handlePickWeekDay(3)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.changeStartDate);
    });
  });

  describe('handleRemoveDate()', () => {
    it('should handleRemoveDate()', () => {
      instance.changeStartDate = jest.fn();

      instance.handleRemoveDate();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.changeStartDate);
    });
  });

  describe('startPickDate()', () => {
    it('should startPickDate()', () => {
      instance.picker = { open: jest.fn() };

      instance.startPickDate();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.picker.open);
    });
  });

  describe('displayDate()', () => {
    it('should return displayDate', () => {
      rendered.setProps({ displayDate: 'not startDate' });

      expect(instance.displayDate()).toBe('not startDate');
    });
  });

  describe('startDate()', () => {
    it('should return null', () => {
      rendered.setProps({ startDate: '' });

      expect(instance.startDate()).toBe(null);
    });

    it('should return startDate', () => {
      rendered.setProps({ startDate: '2233' });

      expect(typeof instance.startDate()).toBe('object');
    });
  });

  describe('weekend()', () => {
    it('should return weekday', () => {
      rendered.setProps({ displayDate: 'weekDay', weekDay: 0 });

      expect(instance.weekend()).toBe(true);
    });

    it('should return startDate', () => {
      rendered.setProps({ displayDate: 'startDate', weekDay: 0 });
      instance.startDate = jest.fn(() => '1/1/2001');
      LOGIC_HELPERS.ifElse = jest.fn(() => 'LOGIC_HELPERS.ifElse');

      expect(instance.weekend()).toBe('LOGIC_HELPERS.ifElse');
    });
  });

  describe('goToDayView()', () => {
    it('should call history.push', () => {
      rendered.setProps({
        location: {
          search: '?tab=1',
        },
      });

      instance.goToDayView();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });

    it('should setValue', () => {
      rendered.setProps({
        location: {
          search: '?tab=0&dayView=day',
        },
      });

      instance.goToDayView();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('renderTitle()', () => {
    it('should return empty', () => {
      rendered.setProps({ startDate: '' });

      expect(instance.renderTitle()).toEqual({});
    });

    it('should return title', () => {
      rendered.setProps({ startDate });

      const result = instance.renderTitle();

      expect(typeof result).toBe('object');
      expect(result.title).toBeDefined();
    });
  });

  describe('renderDayAgo()', () => {
    it('should return 0', () => {
      expect(instance.renderDayAgo(0)).toMatchSnapshot();
    });

    it('should return 1', () => {
      expect(instance.renderDayAgo(1)).toMatchSnapshot();
    });

    it('should return 5', () => {
      expect(instance.renderDayAgo(5)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ shorten: true, startDate: '' });

      expect(instance.renderDefault()).toBe('');
    });

    it('should renderDefault', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderProp()', () => {
    it('should return null', () => {
      rendered.setProps({ displayDate: 'none' });

      expect(instance.renderProp()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ displayDate: 'startDate' });
      instance.renderDefault = jest.fn(() => 'renderDefault');

      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });

    it('should renderProp', () => {
      const children = jest.fn(() => 'children');

      rendered.setProps({ displayDate: 'startDate', children });
      instance.renderDefault = jest.fn(() => 'renderDefault');

      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });

  describe('renderFirstRow()', () => {
    it('should renderFirstRow startDate', () => {
      rendered.setProps({ displayDate: 'startDate', startDate });

      TEST_HELPERS.expectMatchSnapshot(instance.renderFirstRow);
    });

    it('should renderFirstRow weekDay', () => {
      rendered.setProps({ displayDate: 'weekDay', weekDay: 3 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderFirstRow);
    });

    it('should renderFirstRow none', () => {
      rendered.setProps({ displayDate: 'none' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderFirstRow);
    });
  });

  describe('renderSecondRow()', () => {
    it('should renderSecondRow startDate', () => {
      rendered.setProps({ displayDate: 'startDate', startDate });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSecondRow);
    });

    it('should renderSecondRow weekDay', () => {
      rendered.setProps({ displayDate: 'weekDay', weekDay: 3 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSecondRow);
    });

    it('should renderSecondRow none', () => {
      rendered.setProps({ displayDate: 'none' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSecondRow);
    });
  });

  describe('renderEvent()', () => {
    it('should renderEvent', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderEvent({ timeToGo: 'one day' })({ icon: 'icon' }),
      );
    });
  });

  describe('renderButtonContent()', () => {
    it('should renderButtonContent', () => {
      instance.renderFirstRow = jest.fn(() => 'renderFirstRow');
      instance.renderSecondRow = jest.fn(() => 'renderSecondRow');

      rendered.setProps({
        displayDate: 'startDate',
        startDate: '2018-05-28T16:23:45.6789Z',
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtonContent);
    });
  });

  describe('renderCalendarButton()', () => {
    it('should renderCalendar readonly', () => {
      rendered.setProps({ editable: false });
      instance.showToday = jest.fn(() => false);

      instance.renderButtonContent = jest.fn(() => 'renderButtonContent');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCalendarButton, [{}]);
    });

    it('should renderCalendar readonly', () => {
      rendered.setProps({ editable: true });
      instance.showToday = jest.fn(() => true);

      instance.renderButtonContent = jest.fn(() => 'renderButtonContent');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCalendarButton, [{}]);
    });
  });

  describe('renderCalendarMenu()', () => {
    it('should renderCalendarMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCalendarMenu, [{}]);
    });
  });

  describe('renderCalendarBadge()', () => {
    it('should return null', () => {
      instance.displayDate = jest.fn();
      rendered.setProps({ updatingTourInfo: false, displayDate: 'none' });
      instance.renderCalendarBadge();
      expect(instance.displayDate).toBeCalled();
    });

    it('should renderCalendarBadge', () => {
      rendered.setProps({ updatingTourInfo: false, displayDate: 'startDate' });
      instance.displayDate = jest.fn();
      instance.renderCalendarBadge();
      expect(instance.displayDate).toBeCalled();
    });
    it('should renderCalendarBadge', () => {
      rendered.setProps({
        updatingTourInfo: false,
        displayDate: 'startDate',
        editable: true,
      });
      instance.displayDate = jest.fn();
      instance.renderCalendarBadge();
      expect(instance.displayDate).toBeCalled();
    });
  });

  describe('renderPickerTextField()', () => {
    it('should renderPickerTextField', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPickerTextField);
    });
  });

  describe('renderSmallBadge()', () => {
    it('should return null', () => {
      rendered.setProps({ startDate: '', displayDate: 'weekDay' });

      expect(instance.renderSmallBadge()).toBe(null);
    });

    it('should renderSmallBadge', () => {
      rendered.setProps({ startDate: '2233', displayDate: 'startDate' });

      expect(instance.renderSmallBadge()).not.toBe(null);
    });
  });

  describe('renderSubtitle()', () => {
    it('should renderSubtitle', () => {
      rendered.setProps({ startDate: '2233', displayDate: 'startDate' });

      expect(instance.renderSubtitle()).not.toBe(null);
    });
  });

  describe('closePortal()', () => {
    it('should closePortal', () => {
      rendered.setState({ portalId: 1 });
      rendered.setProps({ startDate: '2233', displayDate: 'startDate' });

      expect(instance.closePortal()).not.toBe(null);
    });
  });

  describe('getPortalId()', () => {
    it('should getPortalId', () => {
      instance.getPortalId(1);
      expect(rendered.state().portalId).toBe(1);
    });
    it('should getPortalId', () => {
      instance.getPortalId(null);
      expect(rendered.state().portalId).toBe(null);
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });

    it('should renderProp', () => {
      const children = jest.fn(() => 'children');

      rendered.setProps({ children });
      instance.renderProp = jest.fn(() => 'renderProp');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
