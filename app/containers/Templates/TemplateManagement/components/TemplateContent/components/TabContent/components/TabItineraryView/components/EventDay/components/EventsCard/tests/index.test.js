import { shallow } from 'enzyme';
import React from 'react';
import { EventsCard } from '../index';

describe('<EventsCard />', () => {
  let instance;
  let component;

  const props = {
    classes: {},
    events: [],
    showLabel: true,
    hasTime: false,
  };

  beforeEach(() => {
    component = shallow(<EventsCard {...props} />);
    instance = component.instance();
  });

  it('should exists', () => {
    expect(EventsCard).toBeDefined();
  });

  describe('renderEventCard()', () => {
    it('still matches snapshot', () => {
      expect(
        instance.renderEventCard({ id: 1, position: 'pos' }),
      ).toMatchSnapshot();
    });
  });

  describe('notFlightEnd()', () => {
    it('return false', () => {
      expect(
        instance.notFlightEnd({
          subtype: 'Flight',
          position: 'end',
          dayCount: 0,
        }),
      ).toEqual(false);
    });
    it('return true', () => {
      expect(
        instance.notFlightEnd({ subtype: 'sometype', position: 'end' }),
      ).toEqual(true);
    });
  });
  describe('renderLabel()', () => {
    it('still matches snapshot', () => {
      component.setProps({ showLabel: true });
      expect(instance.renderLabel()).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('still matches snapshot', () => {
      component.setProps({ events: [{ id: 1 }] });
      expect(instance.render()).toMatchSnapshot();
    });
  });

  it('should render without exploding', () => {
    expect(component.length).toBe(1);
  });
});
