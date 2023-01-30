import React from 'react';
import { shallow } from 'enzyme';
import { CalculatedEvents } from '../index';
jest.useFakeTimers();
describe('<CalculatedEvents />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<CalculatedEvents resaga={resaga} />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should return null', () => {
      expect(instance.render()).toEqual(null);
    });
    it('should return null', () => {
      rendered.setProps({ events: [] });
      instance.render();
      expect(instance.render()).toEqual(null);
    });
  });

  describe('componentWillUnmount', () => {
    it('shall not call clearTimeout ', () => {
      instance.componentWillUnmount();
      expect(clearTimeout).not.toHaveBeenCalled();
    });
  });

  describe('collectData', () => {
    it('shall call set value', () => {
      rendered.setProps({ eids: [1, 2] });
      instance.items = {
        map: [
          {
            props: {
              id: 1,
              startValue: 'a',
              startMode: 'b',
              startTimeZone: 'c',
              startTimeReal: 'd',
              endValue: 'e',
              endMode: 'f',
              endTimeZone: 'g',
              endTimeReal: 'h',
              eventDataId: 2,
              eventType: 'j',
              eventSubType: 'k',
            },
          },
        ],
      };
      instance.collectData();
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('shouldComponentUpdate', () => {
    it('shall update if events are not same ', () => {
      rendered.setProps({ events: [] });
      expect(instance.shouldComponentUpdate({ events: [1, 2] })).toBe(true);
    });
    it('shall update if eids are not same ', () => {
      rendered.setProps({ events: [1, 2] });
      expect(
        instance.shouldComponentUpdate({ events: [1, 2], eids: [1, 2] }),
      ).toBe(true);
    });
    it('shall update if state are not same ', () => {
      rendered.setProps({ events: [1, 2], eids: [1, 2] });
      expect(
        instance.shouldComponentUpdate(
          { events: [1, 2], eids: [1, 2] },
          { differentState: 1 },
        ),
      ).toBe(true);
    });
    it('shall update if templateId are not same ', () => {
      rendered.setProps({ events: [1, 2], eids: [1, 2] });
      expect(
        instance.shouldComponentUpdate(
          {
            events: [1, 2],
            eids: [1, 2],
            templateId: 1,
          },
          {},
        ),
      ).toBe(true);
    });
    it('shall update if dayId are not same ', () => {
      rendered.setProps({ events: [1, 2], eids: [1, 2], templateId: 1 });
      expect(
        instance.shouldComponentUpdate(
          {
            events: [1, 2],
            eids: [1, 2],
            templateId: 1,
            id: 2,
          },
          {},
        ),
      ).toBe(true);
    });
    it('shall update if startTimeValue are not same ', () => {
      rendered.setProps({ events: [1, 2], eids: [1, 2], templateId: 1, id: 2 });
      expect(
        instance.shouldComponentUpdate(
          {
            events: [1, 2],
            eids: [1, 2],
            templateId: 1,
            id: 2,
            startTimeValue: 1,
          },
          {},
        ),
      ).toBe(true);
    });
  });

  describe('debouncedCollect', () => {
    it('debouncedFetchData', () => {
      instance.debouncedCollect();
      instance.debouncedCollect();
      expect(instance.debouncedFetchData).not.toEqual(null);
    });
  });
});
