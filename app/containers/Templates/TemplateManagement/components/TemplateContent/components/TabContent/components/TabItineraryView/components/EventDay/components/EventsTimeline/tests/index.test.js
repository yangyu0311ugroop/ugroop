import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EventsTimeline, EventPropGetter } from '../index';

describe('<EventsTimeline />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    singleDayEventIds: [1, 2],
    pinnedEventIds: [3, 4],
    timeZone: 'timeZone',
    showCardsToggle: true,
    isCardOpen: true,
  };

  beforeEach(() => {
    rendered = shallow(<EventsTimeline {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EventsTimeline).toBeDefined();
  });

  describe('upInsertEvent()', () => {
    it('upserts event', () => {
      const event = {
        id: 1,
        startTime: 'startTime',
        endTime: 'endTime',
      };
      instance.upInsertEvent(event, true);
      expect(instance.events).toEqual([
        {
          id: 1,
          start: 'startTime',
          end: 'endTime',
          dayId: 0,
          position: undefined,
          showLabel: true,
        },
      ]);
    });

    it('removes event if no startTime or endTime', () => {
      const event = { id: 1, position: 'pos' };
      instance.events = [event];
      instance.upInsertEvent(event, true);
      expect(instance.events).toEqual([]);
    });

    it('not upserts event', () => {
      const event = null;
      instance.events = 'events';
      instance.upInsertEvent(event, false);
      expect(instance.events).toEqual('events');
    });

    it('forces update', () => {
      const event = { id: 1 };
      instance.forceUpdate = jest.fn();
      instance.setState({ startingUp: false });
      instance.upInsertEvent(event, true);
      expect(instance.forceUpdate).toBeCalled();
    });
  });

  describe('upInsertPinEvent()', () => {
    it('upserts event', () => {
      const event = {
        id: 1,
        startTime: 'startTime',
        endTime: 'endTime',
      };
      instance.upInsertPinEvent(event, true);
      expect(instance.events).toEqual([
        {
          id: 1,
          start: 'startTime',
          end: 'endTime',
          dayId: 0,
          enableOffset: true,
          position: undefined,
          showLabel: false,
          showTriangle: true,
        },
      ]);
    });

    it('removes event if no startTime or endTime', () => {
      const event = { id: 1, position: 'pos' };
      instance.events = [event];
      instance.upInsertPinEvent(event, true);
      expect(instance.events).toEqual([]);
    });

    it('not upserts event', () => {
      const event = null;
      instance.events = 'events';
      instance.upInsertPinEvent(event, false);
      expect(instance.events).toEqual('events');
    });

    it('forces update', () => {
      const event = { id: 1 };
      instance.forceUpdate = jest.fn();
      instance.setState({ startingUp: false });
      instance.upInsertPinEvent(event, true);
      expect(instance.forceUpdate).toBeCalled();
    });
  });

  describe('renderCardsToggle()', () => {
    it('still matches snapshot when closed', () => {
      rendered.setProps({ isCardOpen: false });
      expect(instance.renderCardsToggle()).toMatchSnapshot();
    });
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('EventPropGetter', () => {
    it('shall return correct style', () => {
      expect(EventPropGetter()).toMatchSnapshot();
    });
  });
});
