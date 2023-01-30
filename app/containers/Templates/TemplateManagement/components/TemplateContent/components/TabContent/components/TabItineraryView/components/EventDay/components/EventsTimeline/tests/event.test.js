import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EventView } from '../event';

describe('<EventView />', () => {
  let rendered;
  let instance;
  const props = {
    event: {
      id: 1,
      eventId: 1,
      dayId: 1,
    },
  };

  beforeEach(() => {
    rendered = shallow(<EventView {...props} />);
    instance = rendered.instance();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDuration()', () => {
    it('still matches snapshot if event=flight and position=start', () => {
      const event = {
        type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
        position: NODE_CONSTANTS.POSITIONS.start,
      };
      rendered.setProps({ event });
      expect(instance.renderDuration()).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
