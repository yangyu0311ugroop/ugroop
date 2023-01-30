import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Event } from '../index';

describe('<Event />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    dayId: 99,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Event {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Event).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openViewDialog()', () => {
    it('should return null', () => {
      rendered.setProps({ value: null });

      expect(instance.openViewDialog()).toBe(undefined);
    });

    it('should openViewDialog', () => {
      rendered.setProps({ value: 'value' });
      instance.openViewEvent = jest.fn(() => 'openViewEvent');

      instance.openViewDialog();

      TEST_HELPERS.expectCalled(instance.openViewEvent);
    });
  });

  describe('openViewEvent()', () => {
    it('should return null', () => {
      rendered.setProps({ badge: true });

      expect(instance.openViewDialog()).toBe(undefined);
    });

    it('should openViewEvent()', () => {
      rendered.setProps({});
      PORTAL_HELPERS.openViewEvent = jest.fn(() => 'openViewEvent');

      instance.openViewEvent();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openViewEvent);
    });
  });

  describe('renderPart()', () => {
    it('should renderPart', () => {
      TEST_HELPERS.expectDefined(instance.renderPart);
    });
  });

  describe('renderEventIconValue()', () => {
    it('should renderEventIconValue', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventIconValue);
    });
  });

  describe('renderLocation()', () => {
    it('should return null', () => {
      expect(instance.renderLocation()).toBe(null);
    });

    it('should renderLocation', () => {
      rendered.setProps({ event: { location: { name: 'location 333 ' } } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLocation);
    });
  });

  describe('renderName()', () => {
    it('should render eventFullName', () => {
      EVENT_VIEW_HELPERS.eventFullName = jest.fn(() => 'eventFullName');

      expect(instance.renderName()).toBe('eventFullName');
    });
  });

  describe('renderBothTime()', () => {
    it('should renderBothTime', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBothTime);
    });
  });

  describe('renderTime()', () => {
    it('should return !dayId', () => {
      instance.renderBothTime = jest.fn(() => 'renderBothTime');

      rendered.setProps({ dayId: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTime);
    });

    it('should return isAccommodation', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => true);
      instance.renderBothTime = jest.fn(() => 'renderBothTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTime);
    });

    it('should return isCarHire', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isCarHire = jest.fn(() => true);
      instance.renderBothTime = jest.fn(() => 'renderBothTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTime);
    });

    it('should return isTransportation', () => {
      EVENT_VIEW_HELPERS.isCarHire = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);
      instance.renderBothTime = jest.fn(() => 'renderBothTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTime);
    });

    it('should return isEventCustomDate', () => {
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);
      EVENT_HELPERS.isEventCustomDate = jest.fn(() => true);
      instance.renderBothTime = jest.fn(() => 'renderBothTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTime);
    });

    it('should return default', () => {
      EVENT_HELPERS.isEventCustomDate = jest.fn(() => false);
      instance.renderBothTime = jest.fn(() => 'renderBothTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTime);
    });
  });

  describe('renderSubDetailType()', () => {
    it('should return transportation', () => {
      EVENT_VIEW_HELPERS.isBus = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isCoach = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubDetailType);
    });

    it('should renderSubDetailType', () => {
      EVENT_VIEW_HELPERS.isBus = jest.fn(() => true);
      EVENT_VIEW_HELPERS.isCoach = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubDetailType);
    });
  });

  describe('renderEventIcon()', () => {
    it('should renderEventIcon', () => {
      TEST_HELPERS.expectDefined(instance.renderEventIcon);
    });
  });

  describe('renderCity()', () => {
    it('should return isPositionStart', () => {
      instance.isPositionStart = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCity);
    });

    it('should return !isPositionStart', () => {
      instance.isPositionStart = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCity);
    });
  });

  describe('renderAirport()', () => {
    it('should return isPositionStart', () => {
      instance.isPositionStart = jest.fn(() => true);
      rendered.setProps({
        event: {
          location: {
            detail: {
              detail: { start: { airport: { name: 'airport start' } } },
            },
          },
        },
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderAirport);
    });

    it('should return !isPositionStart', () => {
      instance.isPositionStart = jest.fn(() => false);
      rendered.setProps({
        event: {
          location: {
            detail: { detail: { end: { airport: { name: 'airport end' } } } },
          },
        },
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderAirport);
    });
  });

  describe('renderFlightContent()', () => {
    it('should renderFlightContent', () => {
      instance.renderAirport = jest.fn(() => 'renderAirport');

      TEST_HELPERS.expectDefined(instance.renderFlightContent);
    });
  });

  describe('renderTransportationContent()', () => {
    it('should renderTransportationContent', () => {
      EVENT_VIEW_HELPERS.location = jest.fn(() => 'location');
      instance.renderTransportationAddress = jest.fn(
        () => 'renderTransportationAddress',
      );
      instance.renderContentName = jest.fn(() => 'renderContentName');

      TEST_HELPERS.expectDefined(instance.renderTransportationContent);
    });
  });

  describe('renderContentName()', () => {
    it('should renderContentName', () => {
      instance.renderWithTooltip = jest.fn(() => 'renderWithTooltip');
      instance.renderCancel = jest.fn(() => 'renderCancel');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContentName);
    });

    it('should renderContentName smDown', () => {
      rendered.setProps({ smDown: true });
      instance.renderWithTooltip = jest.fn(() => 'renderWithTooltip');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContentName);
    });
  });

  describe('renderCancel()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.isCancelled = jest.fn(() => false);

      expect(instance.renderCancel()).toBe(null);
    });

    it('should renderCancel', () => {
      EVENT_VIEW_HELPERS.isCancelled = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCancel);
    });
  });

  describe('renderAmount()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => true);

      expect(instance.renderAmount()).toBe(null);
    });

    it('should renderAmount', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderAmount);
    });
  });

  describe('renderContent()', () => {
    it('should return isPositionMiddle', () => {
      EVENT_VIEW_HELPERS.isPositionMiddle = jest.fn(() => true);

      TEST_HELPERS.expectDefined(instance.renderContent);
    });

    it('should return isFlight', () => {
      EVENT_VIEW_HELPERS.isPositionMiddle = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => true);
      instance.renderFlightContent = jest.fn(() => 'renderFlightContent');

      expect(instance.renderContent()).toBe('renderFlightContent');
    });

    it('should return isTransportation', () => {
      EVENT_VIEW_HELPERS.isPositionMiddle = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);
      instance.renderTransportationContent = jest.fn(
        () => 'renderTransportationContent',
      );

      expect(instance.renderContent()).toBe('renderTransportationContent');
    });

    it('should renderTransportationContent', () => {
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);

      TEST_HELPERS.expectDefined(instance.renderContent);
    });
  });

  describe('renderEventDefault()', () => {
    it('should renderEventDefault', () => {
      instance.renderTime = jest.fn(() => 'renderTime');
      instance.renderEventIcon = jest.fn(() => 'renderEventIcon');
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectDefined(instance.renderEventDefault);
    });

    it('should renderEventDefault smDown', () => {
      instance.renderTime = jest.fn(() => 'renderTime');
      instance.renderEventIcon = jest.fn(() => 'renderEventIcon');
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectDefined(instance.renderEventDefault);
    });
  });

  describe('renderWithTooltip()', () => {
    it('should renderWithTooltip', () => {
      instance.renderTooltipContent = jest.fn(() => 'renderTooltipContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderWithTooltip, [
        'rendered',
      ]);
    });
  });

  describe('renderTooltipContent()', () => {
    it('should renderTooltipContent', () => {
      TEST_HELPERS.expectDefined(instance.renderTooltipContent);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ dataId: 0 });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      instance.renderEventDefault = jest.fn(() => 'renderEventDefault');

      rendered.setProps({ dataId: 99 });

      expect(instance.render()).toBe('renderEventDefault');
    });
  });
});
