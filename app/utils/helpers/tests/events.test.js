/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import { EVENT_HELPERS } from 'utils/helpers/events';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import {
  EVENT_CONSTANTS,
  UNKNOWN_EVENT_TYPE,
  UNKNOWN_EVENT_SUBTYPE,
} from 'utils/constants/events';
import { EVENT } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';

describe('utils/helpers/events', () => {
  describe('#canCreateEvent', () => {
    it('calls ability.can', () => {
      ability.can = jest.fn(() => true);
      expect(EVENT_HELPERS.canCreateEvent()).toBe(true);
      expect(ability.can).toBeCalledWith('create', EVENT);
    });
  });

  describe('#getEventTypeConstants', () => {
    it('returns correct constants', () => {
      const typeConsts = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      expect(
        EVENT_HELPERS.getEventTypeConstants(typeConsts.type),
      ).toMatchObject(typeConsts);
    });

    it('returns unknown constants', () => {
      expect(
        EVENT_HELPERS.getEventTypeConstants('SOME_OTHER_TYPE'),
      ).toMatchObject(UNKNOWN_EVENT_TYPE);
    });
  });

  describe('#getEventSubtypeConstants', () => {
    it('returns correct constants', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      const subtypeConsts = EVENT_CONSTANTS.ACTIVITIES.FOOD;
      expect(
        EVENT_HELPERS.getEventSubtypeConstants(type, subtypeConsts.type),
      ).toMatchObject(subtypeConsts);
    });

    it('returns unknown constants', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      expect(
        EVENT_HELPERS.getEventSubtypeConstants(type, 'SOME_OTHER_TYPE'),
      ).toMatchObject(UNKNOWN_EVENT_SUBTYPE);
    });
  });

  describe('#getFirstEventSubtypeConstants', () => {
    it('returns correct constants', () => {
      const type = EVENT_CONSTANTS.EVENTS.ACTIVITY.type;
      const subtypes = Object.values(
        EVENT_HELPERS.getEventTypeConstants(type).getTypes(),
      );
      expect(EVENT_HELPERS.getFirstEventSubtypeConstants(type)).toMatchObject(
        subtypes[0],
      );
    });

    it('returns unknown constants', () => {
      expect(
        EVENT_HELPERS.getFirstEventSubtypeConstants('SOME_OTHER_TYPE'),
      ).toMatchObject(UNKNOWN_EVENT_SUBTYPE);
    });
  });

  describe('#getEventIcons', () => {
    const defaultIcon = { icon: null, name: 'Default', type: '' };

    it('returns correct icons for FOOD', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      const subtype = EVENT_CONSTANTS.ACTIVITIES.FOOD.type;
      const { iconOverrides = [] } = EVENT_HELPERS.getEventSubtypeConstants(
        type,
        subtype,
      );
      expect(EVENT_HELPERS.getEventIcons(type, subtype)).toEqual([
        defaultIcon,
        ...iconOverrides,
      ]);
    });

    it('returns correct icons for unknown type', () => {
      expect(EVENT_HELPERS.getEventIcons()).toEqual([defaultIcon]);
    });
  });

  describe('#getEventIcon', () => {
    const icon = 'icon';
    const iconEnd = 'iconEnd';
    const iconOverrides = [{ icon: 'iconOverride', type: 'iconOverrideType' }];

    it('returns icon by default', () => {
      expect(EVENT_HELPERS.getEventIcon({ icon })).toEqual(icon);
    });

    it('returns icon end if position=end', () => {
      const position = NODE_CONSTANTS.POSITIONS.end;
      expect(EVENT_HELPERS.getEventIcon({ iconEnd, position })).toEqual(
        iconEnd,
      );
    });

    it('returns default icon if position=end', () => {
      const position = NODE_CONSTANTS.POSITIONS.end;
      expect(EVENT_HELPERS.getEventIcon({ icon, position })).toEqual(icon);
    });

    it('returns icon override if found', () => {
      const iconOverride = iconOverrides[0].type;
      expect(
        EVENT_HELPERS.getEventIcon({ iconOverrides, iconOverride }),
      ).toEqual(iconOverrides[0].icon);
    });

    it('returns icon if icon override not found', () => {
      const iconOverride = 'newIconOverrideType';
      expect(
        EVENT_HELPERS.getEventIcon({
          icon,
          iconOverrides,
          iconOverride,
        }),
      ).toEqual(icon);
    });
  });

  describe('#getEventSubtypeClassName', () => {
    it('returns correct constants', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      const subtype = EVENT_CONSTANTS.ACTIVITIES.FOOD.type;
      expect(EVENT_HELPERS.getEventSubtypeClassName(type, subtype)).toEqual(
        `${type}.${subtype}`,
      );
    });
  });

  describe('#getEventSubtypeHoverClassName', () => {
    it('returns correct constants', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      const subtype = EVENT_CONSTANTS.ACTIVITIES.FOOD.type;
      expect(
        EVENT_HELPERS.getEventSubtypeHoverClassName(type, subtype),
      ).toEqual(`${type}.${subtype}.hover`);
    });
  });

  describe('#getEventSubtypeClassBorderColorName', () => {
    it('returns correct constants', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      const subtype = EVENT_CONSTANTS.ACTIVITIES.FOOD.type;
      expect(
        EVENT_HELPERS.getEventSubtypeClassBorderColorName(type, subtype),
      ).toEqual(`${type}.${subtype}.borderColor`);
    });
  });

  describe('#getEventSubtypeClassSolidColorName', () => {
    it('returns correct constants', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      const subtype = EVENT_CONSTANTS.ACTIVITIES.FOOD.type;
      expect(
        EVENT_HELPERS.getEventSubtypeClassSolidColorName(type, subtype),
      ).toEqual(`${type}.${subtype}.solidColor`);
    });
  });

  describe('isFlightTransportationEvent', () => {
    it('should return true if type is flight transportation', () => {
      const result1 = EVENT_HELPERS.isFlightTransportationEvent(
        EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
      );

      expect(result1).toBe(true);
    });

    it('should return false if type is not flight transportation', () => {
      const result1 = EVENT_HELPERS.isFlightTransportationEvent(
        EVENT_CONSTANTS.ACCOMMODATIONS.APARTMENT.type,
      );
      const result2 = EVENT_HELPERS.isFlightTransportationEvent(
        EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
      );

      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
  });
  describe('#isEventCustomDate', () => {
    it('returns correct false', () => {
      const type = EVENT_CONSTANTS.ACTIVITIES.RISE_AND_SHINE.type;
      expect(EVENT_HELPERS.isEventCustomDate(type)).toEqual(true);
    });
  });
  describe('#eventsByTimeZoneIdReducer', () => {
    it('returns correct object', () => {
      const result = EVENT_HELPERS.eventsByTimeZoneIdReducer([[], []], {}, 1, [
        { value: 1 },
      ]);
      expect(typeof result).toBe('object');
    });
    it('returns correct object if offset is 0', () => {
      MOMENT_HELPERS.renderZoneOffset = jest.fn(() => '00:00');
      const result = EVENT_HELPERS.eventsByTimeZoneIdReducer([[], []], {}, 0, [
        { value: 1 },
      ]);
      expect(typeof result).toBe('object');
    });
  });
});
