import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Events } from '../index';

describe('<Events />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  const props = {
    classes: {},
    nonSingleDayEvents: [],
    singleDayEventsWithTime: [],
    singleDayEventsWithoutTime: [],
    id: 1,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Events {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Events).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should setValue', () => {
      EVENT_STORE_HELPERS.setEventCreate = jest.fn(() => 'setEventCreate');
      instance.handleClick();
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('hasSingleDayEventsWithoutTime', () => {
    it('shall return state', () => {
      let res = instance.hasSingleDayEventsWithoutTime();
      expect(res).toBe(false);
      instance.setHasSingleDayEventWithoutTime(true);
      res = instance.hasSingleDayEventsWithoutTime();
      expect(res).toBe(true);
    });
  });

  describe('hasNonSingleDayEvents', () => {
    it('shall return state', () => {
      let res = instance.hasNonSingleDayEvents();
      expect(res).toBe(false);
      instance.setHasNonSingleDayEvents(true);
      res = instance.hasNonSingleDayEvents();
      expect(res).toBe(true);
    });
  });

  describe('hasSingleDayEvents', () => {
    it('shall return state', () => {
      let res = instance.hasSingleDayEvents();
      expect(res).toBe(false);
      instance.setHasSingleDayEventWithTime(true);
      res = instance.hasSingleDayEvents();
      expect(res).toBe(true);
    });
  });

  describe('renderNonSingleDayEventsSeparator', () => {
    it('should match snapshot if hasAllEvents returns true', () => {
      instance.hasAllEvents = jest.fn(() => true);
      const snapshot = shallow(
        <div>{instance.renderNonSingleDayEventsSeparator()}</div>,
      );

      expect(snapshot).toMatchSnapshot();
    });

    it('should snapshot if hasAllEvents returns false', () => {
      instance.hasAllEvents = jest.fn(() => false);
      const snapshot = shallow(
        <div>{instance.renderNonSingleDayEventsSeparator()}</div>,
      );

      expect(snapshot).toMatchSnapshot();
    });
  });

  describe('renderEventIcon()', () => {
    it('still matches snapshot', () => {
      const obj = { id: 'id', position: 'pos' };
      expect(instance.renderEventIcon(obj)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderHr = jest.fn(() => <div />);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
