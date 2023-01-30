/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import {
  EVENTS,
  ACTIVITIES,
  TRANSPORTATIONS,
  ACCOMMODATIONS,
  UNKNOWN_EVENT_TYPE,
  UNKNOWN_EVENT_SUBTYPE,
  EVENT_CONSTANTS,
  TRANSPORTATION_NAMES,
  ACTIVITY_NAMES,
  ACCOMMODATION_NAMES,
} from 'utils/constants/events';

const HEX_COLOR_REGEX = '^#(?:[0-9a-fA-F]{3}){1,2}$';

const TYPE_HAS_VALID_SHAPE = value => {
  it(`#${value.type} has valid shape`, () => {
    expect(value).toEqual(
      expect.objectContaining({
        type: expect.any(String),
        name: expect.any(String),
        getTypes: expect.any(Function),
      }),
    );
    expect(() => value.getTypes()).not.toThrow();
    expect(value.getTypes()).toEqual(expect.objectContaining({}));
  });
};

const SUBTYPE_HAS_VALID_SHAPE = value => {
  it(`#${value.type} has valid shape`, () => {
    const expectedObj = {
      type: expect.any(String),
      name: expect.any(String),
      icon: expect.any(String),
      iconEnd: expect.any(String),
      iconOverrides: expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          icon: expect.any(String),
        }),
      ]),
      colors: expect.objectContaining({
        icon: expect.objectContaining({
          background: expect.objectContaining({
            default: expect.stringMatching(HEX_COLOR_REGEX),
            hover: expect.stringMatching(HEX_COLOR_REGEX),
          }),
        }),
      }),
    };

    // Optional
    if (!value.iconEnd) delete expectedObj.iconEnd;
    if (!value.iconOverrides) delete expectedObj.iconOverrides;

    expect(value).toEqual(expect.objectContaining(expectedObj));
  });
};

describe('utils/constants/events', () => {
  describe('#UNKNOWN_EVENT_TYPE', () =>
    TYPE_HAS_VALID_SHAPE(UNKNOWN_EVENT_TYPE));

  describe('#UNKNOWN_EVENT_SUBTYPE', () =>
    SUBTYPE_HAS_VALID_SHAPE(UNKNOWN_EVENT_SUBTYPE));

  describe('#EVENTS', () => {
    Object.values(EVENTS).forEach(value => TYPE_HAS_VALID_SHAPE(value));

    it('all types are correct', () => {
      expect(EVENTS.ACTIVITY.type).toEqual('Activity');
      expect(EVENTS.TRANSPORTATION.type).toEqual('Transportation');
      expect(EVENTS.ACCOMMODATION.type).toEqual('Accommodation');
    });

    it('all subtypes are correct', () => {
      expect(EVENTS.ACTIVITY.getTypes()).toEqual(ACTIVITIES);
      expect(EVENTS.TRANSPORTATION.getTypes()).toEqual(TRANSPORTATIONS);
      expect(EVENTS.ACCOMMODATION.getTypes()).toEqual(ACCOMMODATIONS);
    });
  });

  describe('#ACTIVITIES', () => {
    Object.values(ACTIVITIES).forEach(value => SUBTYPE_HAS_VALID_SHAPE(value));

    it('all types are correct', () => {
      expect(ACTIVITIES.FOOD.type).toEqual('Food');
      expect(ACTIVITIES.MEETING.type).toEqual('Meeting');
      expect(ACTIVITIES.CONCERT.type).toEqual('Concert');
      expect(ACTIVITIES.TOUR.type).toEqual('Tour');
      expect(ACTIVITIES.THEATRE.type).toEqual('Theatre');
      expect(ACTIVITIES.MATCH.type).toEqual('Match');
      expect(ACTIVITIES.RECREATION.type).toEqual('Recreation');
      expect(ACTIVITIES.OTHER.type).toEqual('Other');
    });
  });

  describe('#ACCOMMODATIONS', () => {
    Object.values(ACCOMMODATIONS).forEach(value =>
      SUBTYPE_HAS_VALID_SHAPE(value),
    );

    it('all types are correct', () => {
      expect(ACCOMMODATIONS.HOTEL.type).toEqual('Hotel');
      expect(ACCOMMODATIONS.HOSTEL.type).toEqual('Hostel');
      expect(ACCOMMODATIONS.MOTEL.type).toEqual('Motel');
      expect(ACCOMMODATIONS.APARTMENT.type).toEqual('Apartment');
      expect(ACCOMMODATIONS.BED_AND_BREAKFAST.type).toEqual('BedAndBreakfast');
      expect(ACCOMMODATIONS.CAMPING_GROUND.type).toEqual('CampingGround');
      expect(ACCOMMODATIONS.CHALET.type).toEqual('Chalet');
      expect(ACCOMMODATIONS.FARMSTAY.type).toEqual('Farmstay');
      expect(ACCOMMODATIONS.GUEST_HOUSE.type).toEqual('GuestHouse');
      expect(ACCOMMODATIONS.HOLIDAY_PARK.type).toEqual('HolidayPark');
      expect(ACCOMMODATIONS.HOMESTAY.type).toEqual('Homestay');
      expect(ACCOMMODATIONS.LODGE.type).toEqual('Lodge');
      expect(ACCOMMODATIONS.RESORT.type).toEqual('Resort');
      expect(ACCOMMODATIONS.OTHER.type).toEqual('Other');
    });
  });

  describe('#EVENT_CONSTANTS', () => {
    it('all subtypes are correct', () => {
      expect(EVENT_CONSTANTS.ACCOMMODATION_SELECT).toMatchSnapshot();
    });

    it('FOOD_ICON_SELECT are correct', () => {
      expect(EVENT_CONSTANTS.FOOD_ICON_SELECT).toMatchSnapshot();
    });

    it('FOOD_ICON_KEY are correct', () => {
      expect(EVENT_CONSTANTS.FOOD_ICON_KEY).toMatchSnapshot();
    });
  });

  describe('#subtypeNamesByType', () => {
    it('Transportation', () => {
      expect(EVENT_CONSTANTS.subtypeNamesByType('Transportation')).toBe(
        TRANSPORTATION_NAMES,
      );
    });

    it('Activity', () => {
      expect(EVENT_CONSTANTS.subtypeNamesByType('Activity')).toBe(
        ACTIVITY_NAMES,
      );
    });

    it('Accommodation', () => {
      expect(EVENT_CONSTANTS.subtypeNamesByType('Accommodation')).toBe(
        ACCOMMODATION_NAMES,
      );
    });

    it('Other', () => {
      expect(EVENT_CONSTANTS.subtypeNamesByType('Other')).toMatchSnapshot();
    });
  });
});
