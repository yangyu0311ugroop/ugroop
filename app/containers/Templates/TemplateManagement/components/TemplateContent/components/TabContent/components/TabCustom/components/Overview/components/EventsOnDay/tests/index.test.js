import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EventsOnDay } from '../index';

describe('<EventsOnDay />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    type: 'ACTIVITIES',
    subtype: 'MEETING',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<EventsOnDay {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EventsOnDay).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('newEvent()', () => {
    it('should newEvent()', () => {
      EVENT_STORE_HELPERS.setEventCreate = jest.fn(
        () => 'EVENT_STORE_HELPERS.setEventCreate',
      );

      instance.newEvent({}, { onOpen: jest.fn() });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('openCreateEventDialog()', () => {
    it('should openCreateEventDialog()', () => {
      EVENT_STORE_HELPERS.setEventCreate = jest.fn(
        () => 'EVENT_STORE_HELPERS.setEventCreate',
      );

      expect(
        instance.openCreateEventDialog(['ACTIVITIES', 'MEETING'])(),
      ).toEqual({ typeOpen: false, subtypeOpen: false });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('newAccommodation()', () => {
    it('should newAccommodation()', () => {
      instance.newEvent = jest.fn();

      instance.newAccommodation();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.newEvent);
    });
  });

  describe('renderAddAccommodation()', () => {
    it('should renderAddAccommodation()', () => {
      instance.renderAddEventButton = jest.fn(() => 'renderAddEventButton');

      expect(instance.renderAddAccommodation({})).toBe('renderAddEventButton');

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.renderAddEventButton);
    });
  });

  describe('renderAddEventPopperButton()', () => {
    it('should renderAddEventPopperButton()', () => {
      instance.renderAddEventButton = jest.fn(() => 'renderAddEventButton');

      expect(
        instance.renderAddEventPopperButton({
          type: 'ACTIVITIES',
          subtype: 'MEETING',
        }),
      ).toBe('renderAddEventButton');

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.renderAddEventButton);
    });
  });

  describe('renderAddEventButton()', () => {
    it('should renderAddEventButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddEventButton, [{}]);
    });
  });

  describe('renderEventMenuItem()', () => {
    it('should renderEventMenuItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventMenuItem, [{}]);
    });
  });

  describe('renderAddActivityMenu()', () => {
    it('should renderAddActivityMenu', () => {
      instance.renderEventMenuItem = jest.fn(() => 'renderEventMenuItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddActivityMenu, [{}]);
    });
  });

  describe('renderAddActivity()', () => {
    it('should renderAddActivity', () => {
      instance.renderAddActivityMenu = jest.fn(() => 'renderAddActivityMenu');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddActivity, [{}]);
    });
  });

  describe('renderAddTransportationMenu()', () => {
    it('should renderAddTransportationMenu', () => {
      instance.renderEventMenuItem = jest.fn(() => 'renderEventMenuItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddTransportationMenu, [
        {},
      ]);
    });
  });

  describe('renderAddTransportation()', () => {
    it('should renderAddTransportation', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddTransportation);
    });
  });

  describe('renderAddFoodMenu()', () => {
    it('should renderAddFoodMenu', () => {
      instance.renderEventMenuItem = jest.fn(() => 'renderEventMenuItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddFoodMenu, [{}]);
    });
  });

  describe('renderAddFood()', () => {
    it('should renderAddFood', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddFood);
    });
  });

  describe('renderAddEvent()', () => {
    it('should renderAddEvent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddEvent);
    });
  });

  describe('renderEventIcon()', () => {
    it('should renderEventIcon', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventIcon, [{}]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
