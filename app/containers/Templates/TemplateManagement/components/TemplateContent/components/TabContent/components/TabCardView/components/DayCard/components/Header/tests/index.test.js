import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import momentHelper from 'utils/helpers/moment';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    id: 1,
    startDate: '2014-09-08T08:02:17-05:00',
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCreateEvent', () => {
    it('should call setValue', () => {
      EVENT_STORE_HELPERS.setEventCreate = jest.fn(
        () => 'EVENT_STORE_HELPERS.setEventCreate',
      );
      instance.hideAddSectionMenu = jest.fn();

      instance.handleCreateEvent();

      expect(instance.hideAddSectionMenu).toBeCalled();
      expect(instance.hideAddSectionMenu.mock.calls).toMatchSnapshot();
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('showAddSectionMenu', () => {
    it('should setState', () => {
      rendered.setState({ open: false });

      instance.showAddSectionMenu({});

      expect(rendered.state().open).toBe(true);

      instance.showAddSectionMenu({});

      expect(rendered.state().open).toBe(true);
    });
  });

  describe('hideAddSectionMenu', () => {
    it('should setState', () => {
      rendered.setState({ open: true });

      instance.hideAddSectionMenu({});

      expect(rendered.state().open).toBe(false);

      instance.hideAddSectionMenu({});

      expect(rendered.state().open).toBe(false);
    });
  });

  describe('displayDayOnly()', () => {
    it('should render correctly', () => {
      momentHelper.getDateWithFormat = jest.fn(
        () => 'momentHelper.getDateWithFormat',
      );

      const snapshot = shallow(<div>{instance.displayDayOnly({}, true)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.displayCardAddInfo = jest.fn(() => 'displayCardAddInfo');
      instance.displayCardAddInfo = jest.fn(() => 'displayCardAddInfo');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render a particular structure if startDate is not existing', () => {
      rendered.setProps({
        displayDate: 'none',
        startDate: '',
        startTime: '1',
        classes: {
          weekendHeader: '1',
        },
      });
      instance.displayCardAddInfo = jest.fn(() => 'displayCardAddInfo');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render a particular structure if displayDate is weekDay', () => {
      rendered.setProps({
        displayDate: 'weekDay',
        startDate: '',
        startTime: '1',
        classes: {
          weekendHeader: '1',
          whiteColor: '1',
          whiteDot: '1',
        },
        isWeekend: true,
        editable: true,
      });
      instance.displayWithDate = jest.fn(() => 'displayWithDate');
      instance.displayCardAddInfo = jest.fn(() => 'displayCardAddInfo');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
