/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { dateDisplay } from 'utils/constant';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EventIconTooltipContent } from '..';

describe('<EventIconTooltipContent />', () => {
  let wrapper;
  let instance;

  const makeProps = (id = 123, dataId = 456) => ({
    classes: {},
    id,
    dataId,
    onView: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    templateId: 789,
    displayDate: dateDisplay.startDate,
    event: null,
  });

  beforeEach(() => {
    wrapper = shallow(<EventIconTooltipContent {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(EventIconTooltipContent).toBeDefined();
  });

  describe('#isActivity()', () => {
    it('returns true', () => {
      const type = EVENT_CONSTANTS.EVENTS.ACTIVITY.type;
      expect(instance.isActivity(type)).toBe(true);
    });
  });

  describe('#isFlight()', () => {
    it('returns true', () => {
      const type = EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type;
      expect(instance.isFlight(type, subtype)).toBe(true);
    });
  });

  describe('isVehicleHire', () => {
    it('should return true if it is transportation and the type is vehicle hire', () => {
      const type = EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type;
      const result = instance.isVehicleHire(type, subtype);

      expect(result).toBe(true);
    });

    it('should return false if it is transportation and the type is not vehicle hire', () => {
      const type = EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.SHIP.type;
      const result = instance.isVehicleHire(type, subtype);

      expect(result).toBe(false);
    });
  });

  describe('#renderTime()', () => {
    it('still matches snapshot if position=start', () => {
      const position = NODE_CONSTANTS.POSITIONS.start;
      expect(instance.renderTime(true, false, position)).toMatchSnapshot();
    });

    it('still matches snapshot if position=end', () => {
      const position = NODE_CONSTANTS.POSITIONS.end;
      expect(instance.renderTime(true, false, position)).toMatchSnapshot();
    });

    it('still matches snapshot if position=end and nonAerial is true', () => {
      const position = NODE_CONSTANTS.POSITIONS.end;
      expect(instance.renderTime(false, false, position)).toMatchSnapshot();
    });

    it('still matches snapshot if nonAerial is true', () => {
      const position = NODE_CONSTANTS.POSITIONS.start;
      expect(instance.renderTime(false, true, position)).toMatchSnapshot();
    });

    it('still matches snapshot if this.hasActivityDetail is true', () => {
      const position = NODE_CONSTANTS.POSITIONS.start;
      instance.hasActivityDetail = jest.fn(() => true);
      expect(instance.renderTime(false, true, position)).toMatchSnapshot();
    });
  });

  describe('#renderAirport()', () => {
    it('still matches snapshot if position=start', () => {
      const position = NODE_CONSTANTS.POSITIONS.start;
      expect(instance.renderAirport(true, position)).toMatchSnapshot();
    });

    it('still matches snapshot if position=end', () => {
      const position = NODE_CONSTANTS.POSITIONS.end;
      expect(instance.renderAirport(true, position)).toMatchSnapshot();
    });
  });

  describe('#renderFlightBooking()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderFlightBooking(true)).toMatchSnapshot();
    });
  });

  describe('#renderDescription()', () => {
    it('renders null if no description', () => {
      expect(instance.renderDescription()).toBeNull();
    });
  });

  describe('#renderLocationLink()', () => {
    it('still matches snapshot', () => {
      const location = { name: 'location.name' };
      const map = { url: 'map.url' };
      expect(instance.renderLocationLink(location)(map)).toMatchSnapshot();
    });
    it('still matches snapshot without map url', () => {
      const location = { name: 'location.name' };
      const map = {};
      expect(instance.renderLocationLink(location)(map)).toMatchSnapshot();
    });
  });

  describe('#renderFooter()', () => {
    it('renders null if no location', () => {
      expect(instance.renderFooter()).toBeNull();
    });
    it('does not render a url', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderFooter('location', 'not url'),
      );
    });
  });

  describe('renderStartLocation', () => {
    it('should return false if flight is true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderStartLocation(false)).toBe(false);
    });

    it('should return renderPart if flight is false', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderStartLocation(true)).toBe('renderPart');
    });
  });

  describe('renderEndLocation', () => {
    it('should return false if flight is true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderEndLocation(false)).toBe(false);
    });

    it('should return renderPart if flight is not true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderEndLocation(true)).toBe('renderPart');
    });
  });

  describe('#renderAirline()', () => {
    it('should return false if flight is not true', () => {
      expect(instance.renderAirline(false)).toBe(false);
    });
    it('should return renderPart if flight is true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderAirline(true)).toBe('renderPart');
    });
  });

  describe('#renderTerminal()', () => {
    it('should return false if flight is not true', () => {
      expect(instance.renderTerminal(false)).toBe(false);
    });
    it('should return renderPart if flight is true and isStart is true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      instance.isStart = jest.fn(() => true);
      expect(instance.renderTerminal(true)).toBe('renderPart');
    });
    it('should return false if flight is true and isStart is false', () => {
      instance.isStart = jest.fn(() => false);
      expect(instance.renderTerminal(true)).toBe(false);
    });
  });

  describe('#renderFlightNumber()', () => {
    it('should return false if flight is not true', () => {
      expect(instance.renderFlightNumber(false)).toBe(false);
    });
    it('should return renderPart if flight is true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderFlightNumber(true)).toBe('renderPart');
    });
  });

  describe('#renderActivityDetails()', () => {
    it('should return null if iconOverride is cycling', () => {
      expect(instance.renderActivityDetails()).toEqual(null);
    });
    it('should match snapshot if icon is cycling', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      wrapper.setProps({
        dataId: 1,
        iconOverride: 'Cycling',
      });
      expect(instance.renderActivityDetails()).toMatchSnapshot();
    });
  });

  describe('#renderGate()', () => {
    it('should return false if flight is not true', () => {
      expect(instance.renderGate(false)).toBe(false);
    });
    it('should return renderPart if flight is true and isStart is true', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      instance.isStart = jest.fn(() => true);
      expect(instance.renderGate(true)).toBe('renderPart');
    });
    it('should return false if flight is true and isStart is false', () => {
      instance.isStart = jest.fn(() => false);
      expect(instance.renderGate(true)).toBe(false);
    });
  });

  describe('renderAttachmentIcon', () => {
    it('should return component if there are attachments', () => {
      wrapper.setProps({
        eventAttachments: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderAttachmentIcon()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if links and names exist', () => {
      wrapper.setProps({
        links: ['link1', 'link2'],
        names: ['name1', 'name2'],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachmentIcon);
    });
    it('should match snapshot if links and names do not exist', () => {
      wrapper.setProps({
        links: null,
        names: null,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachmentIcon);
    });
    it('should match snapshot if there is only one attachment', () => {
      wrapper.setProps({
        links: ['link1'],
        eventAttachments: [1],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachmentIcon);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot with event', () => {
      const event = {
        type: 'type',
        detail: {
          type: 'subtype',
        },
        description: 'description',
        location: { name: 'location.name' },
        url: 'https://google.com',
      };
      instance.renderStartLocation = jest.fn(() => 'renderStartLocation');
      instance.renderEndLocation = jest.fn(() => 'renderEndLocation');
      wrapper.setProps({ event });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    it('still matches snapshot with event will show only attachments', () => {
      wrapper.setProps({ attachmentOnly: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
