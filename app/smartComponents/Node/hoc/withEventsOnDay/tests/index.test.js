import React from 'react';
import { shallow } from 'enzyme';
import withEventsOnDay from '../index';

describe('<withEventsOnDay hoc />', () => {
  let rendered;
  let instance;
  const props = {
    eventIds: [],
    variant: 'a',
    eventsWithTime: [],
    activeId: 11,
  };
  beforeEach(() => {
    const View = withEventsOnDay()(<div />);
    rendered = shallow(<View {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setEvents()', () => {
    it('should setEvents()', () => {
      rendered.setState({ events: 1 });

      instance.setEvents(2);

      expect(rendered.state().events).toBe(2);
    });
  });

  describe('shouldComponentUpdate', () => {
    it('shall return true if eventIds is different', () => {
      expect(
        instance.shouldComponentUpdate(
          {
            eventIds: [1, 2],
          },
          { events: [] },
        ),
      ).toBe(true);
    });
    it('shall return true if variant is different', () => {
      expect(
        instance.shouldComponentUpdate(
          {
            eventIds: [],
            variant: 'B',
          },
          { events: [] },
        ),
      ).toBe(true);
    });
    it('shall return true if state is different', () => {
      expect(
        instance.shouldComponentUpdate(
          {
            eventIds: [],
          },
          { events: [1, 2] },
        ),
      ).toBe(true);
    });
    it('should return true if eventsWithTime is different', () => {
      expect(
        instance.shouldComponentUpdate(
          {
            eventIds: [],
            variant: 'a',
            eventsWithTime: [1, 2],
          },
          { events: [] },
        ),
      ).toBe(true);
    });
    it('should return true if activeId is different', () => {
      expect(
        instance.shouldComponentUpdate(
          {
            ...props,
            activeId: 12,
          },
          { events: [] },
        ),
      ).toBe(true);
    });
    it('should return false nothing different', () => {
      expect(
        instance.shouldComponentUpdate(
          {
            ...props,
          },
          { events: [] },
        ),
      ).toBe(false);
    });
  });
});
