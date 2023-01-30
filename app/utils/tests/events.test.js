import { ability } from 'apis/components/Ability/ability';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import dotProp from 'dot-prop-immutable';
import { TRANSPORTATION_END_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/End/inputs';
import { TRANSPORTATION_START_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/Start/inputs';
import {
  EVENT_ACTIVITY,
  EVENT_ACCOMMODATION,
  EVENT_FLIGHT,
  EVENT,
  EVENT_COACH,
  EVENT_BUS,
  EVENT_VEHICLE_HIRE,
  EVENT_SHIP,
  EVENT_BOAT,
  EVENT_FERRY,
  EVENT_TRAIN,
  EVENT_TRAM,
  EVENT_CAR,
  EVENT_CAB,
  EVENT_TAXI,
  EVENT_RIDESHARE,
  EVENT_BICYCLE,
} from 'utils/modelConstants';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EVENT_CONSTANTS, EVENTS } from 'utils/constants/events';
import {
  EVENT_UTILS,
  calculateDateTimeMode,
  calculateDateTimeValue,
  calculateDayIdTimeMode,
  calculateDurationTimeValue,
  processTimeModel,
  processAirportModel,
  processParentNodeId,
  processCoachModel,
  processBicycleActivity,
  processChangeInTransportationSubType,
} from 'utils/events';
import startTimeInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import startAirportInputs from 'smartComponents/Event/components/Event/parts/Flight/StartAirport/inputs';
import MOMENT_HELPERS from '../helpers/moment';
import { NODE_PATHS } from '../../datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from '../../datastore/nodeStore/helpers';

describe('utils/events', () => {
  describe('dataTypeToNodeType', () => {
    it('returns EVENT_ACTIVITY', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACTIVITY;
      expect(EVENT_UTILS.dataTypeToNodeType(type)).toBe(EVENT_ACTIVITY);
    });

    it('returns EVENT_ACCOMMODATION', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACCOMMODATION;
      expect(EVENT_UTILS.dataTypeToNodeType(type)).toBe(EVENT_ACCOMMODATION);
    });

    it('returns EVENT_FLIGHT', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_FLIGHT);
    });

    it('returns EVENT_FLIGHT', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = 'subtype';
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT);
    });

    it('returns EVENT_FLIGHT', () => {
      const type = 'type';
      expect(EVENT_UTILS.dataTypeToNodeType(type)).toBe(EVENT);
    });

    it('returns EVENT_COACH', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_COACH);
    });

    it('returns EVENT_BUS', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_BUS);
    });

    it('returns EVENT_VEHICLE_HIRE', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(
        EVENT_VEHICLE_HIRE,
      );
    });

    it('returns EVENT_SHIP', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.SHIP.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_SHIP);
    });

    it('returns EVENT_BOAT', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.BOAT.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_BOAT);
    });

    it('returns EVENT_FERRY', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_FERRY);
    });

    it('returns EVENT_TRAIN', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.TRAIN.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_TRAIN);
    });

    it('returns EVENT_TRAM', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_TRAM);
    });

    it('returns EVENT_CAR', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.CAR.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_CAR);
    });

    it('returns EVENT_CAB', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.CAB.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_CAB);
    });

    it('returns EVENT_TAXI', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.TAXI.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_TAXI);
    });

    it('returns EVENT_RIDESHARE', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.RIDESHARE.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(
        EVENT_RIDESHARE,
      );
    });

    it('returns EVENT_BICYCLE', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.TRANSPORTATION;
      const subtype = EVENT_CONSTANTS.TRANSPORTATIONS.BICYCLE.type;
      expect(EVENT_UTILS.dataTypeToNodeType(type, subtype)).toBe(EVENT_BICYCLE);
    });
  });

  describe('makeDefaultRoomConfiguration', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(EVENT_UTILS.makeDefaultRoomConfiguration()).toMatchSnapshot();
    });
  });

  describe('getChangedParentNodeId', () => {
    const parentNodeIdPath = NODE_STORE_HELPERS.pathToNodeInputName(
      NODE_PATHS.parentNodeId,
    );

    it('returns changed parentNodeId', () => {
      const inputs = startTimeInputs;
      const changedParentNodeId = 2;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.relative,
      );
      model = dotProp.set(
        model,
        inputs.tempDay.name,
        changedParentNodeId.toString(),
      );
      model = dotProp.set(model, inputs.tempTime.name, '3:00');
      model = dotProp.set(model, parentNodeIdPath, '1');
      expect(EVENT_UTILS.getChangedParentNodeId(model)).toEqual(
        changedParentNodeId,
      );
    });

    it('returns null if parentNodeId not changed', () => {
      let model = {};
      model = dotProp.set(model, parentNodeIdPath, '1');
      expect(EVENT_UTILS.getChangedParentNodeId(model)).toBeNull();
    });
  });

  describe('calculateDateTimeMode', () => {
    it('returns fixedDate if no timeInput', () => {
      expect(calculateDateTimeMode()).toEqual(
        NODE_CONSTANTS.TIME_MODES.fixedDate,
      );
    });
  });

  describe('participantCannotExecuteEvent', () => {
    it('should return true if value is empty string', () => {
      ability.can = jest.fn(() => false);
      expect(EVENT_UTILS.participantCannotExecuteEvent('')).toBe(true);
    });
    it('should return true if value is null', () => {
      ability.can = jest.fn(() => false);
      expect(EVENT_UTILS.participantCannotExecuteEvent(null)).toBe(true);
    });
    it('should return true if value is break', () => {
      ability.can = jest.fn(() => false);
      expect(EVENT_UTILS.participantCannotExecuteEvent('<p><br></p>')).toBe(
        true,
      );
    });
  });

  describe('calculateDateTimeValue', () => {
    it('returns date toISOString if mode=fixedDate', () => {
      const dateIso = '2018-01-01T12:00:00.000Z';
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      const date = MOMENT_HELPERS.createUtc(dateIso);
      expect(calculateDateTimeValue(mode, date)).toEqual(dateIso);
    });

    it('returns null for default mode', () => {
      const mode = 'mode';
      expect(calculateDateTimeValue(mode)).toBeNull();
    });
  });

  describe('calculateDayIdTimeMode', () => {
    it('returns unanchoredAtTime if timeInput and mode=unanchored', () => {
      const modeInput = NODE_CONSTANTS.TIME_MODES.unanchored;
      const timeInput = 'timeInput';
      expect(calculateDayIdTimeMode(modeInput, timeInput)).toEqual(
        NODE_CONSTANTS.TIME_MODES.unanchoredAtTime,
      );
    });

    it('returns modeInput if no timeInput', () => {
      const modeInput = 'modeInput';
      const timeInput = null;
      expect(calculateDayIdTimeMode(modeInput, timeInput)).toEqual(modeInput);
    });
  });

  describe('calculateDurationTimeValue', () => {
    it('returns null for default mode', () => {
      const mode = 'mode';
      expect(calculateDurationTimeValue(mode)).toBeNull();
    });
  });

  describe('processTimeModel', () => {
    it('still matches snapshot if mode=relative', () => {
      const inputs = startTimeInputs;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.relative,
      );
      model = dotProp.set(model, inputs.tempDay.name, '1');
      model = dotProp.set(model, inputs.tempTime.name, '3:00');
      expect(processTimeModel(model, inputs)).toMatchSnapshot();
    });

    it('still matches snapshot if mode=relative and day=duration', () => {
      const inputs = startTimeInputs;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.relative,
      );
      model = dotProp.set(model, inputs.tempDay.name, 'P1D');
      expect(processTimeModel(model, inputs)).toMatchSnapshot();
    });

    it('still matches snapshot if mode=relative and day=-duration', () => {
      const inputs = startTimeInputs;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.relative,
      );
      model = dotProp.set(model, inputs.tempDay.name, 'P-1D');
      model = dotProp.set(model, inputs.tempTime.name, '3:00');
      expect(processTimeModel(model, inputs)).toMatchSnapshot();
    });

    it('still matches snapshot if mode=relativeStart', () => {
      const inputs = startTimeInputs;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.relativeStart,
      );
      model = dotProp.set(model, inputs.tempDay.name, 'P1D');
      model = dotProp.set(model, inputs.tempTime.name, '3:00');
      expect(processTimeModel(model, inputs)).toMatchSnapshot();
    });

    it('still matches snapshot if mode=fixedDateTime', () => {
      const inputs = startTimeInputs;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.fixedDateTime,
      );
      model = dotProp.set(
        model,
        inputs.tempDay.name,
        '2018-01-01T12:00:00.000Z',
      );
      model = dotProp.set(model, inputs.tempTime.name, '3:00');
      expect(processTimeModel(model, inputs)).toMatchSnapshot();
    });
  });

  describe('processAirportModel', () => {
    it('still matches snapshot if mode=relative', () => {
      const inputs = startAirportInputs;
      let model = {};
      model = dotProp.set(model, inputs.airport.name, 'name');
      expect(processAirportModel(model, inputs)).toMatchSnapshot();
    });
  });

  describe('processParentNodeId', () => {
    it('still matches snapshot if mode=relative', () => {
      const parentNodeId = 1;
      const inputs = startTimeInputs;
      let model = {};
      model = dotProp.set(
        model,
        inputs.mode.name,
        NODE_CONSTANTS.TIME_MODES.relative,
      );
      model = dotProp.set(model, inputs.tempDay.name, parentNodeId.toString());
      expect(processParentNodeId(model)).toMatchSnapshot();
    });
  });

  describe('processCreateModel', () => {
    it('process correctly', () => {
      const model = { x: 1 };
      expect(EVENT_UTILS.processCreateModel(model)).toEqual(model);
    });
  });

  describe('processPatchModel', () => {
    it('process correctly', () => {
      const model = { x: 1 };
      expect(EVENT_UTILS.processPatchModel(model)).toEqual(model);
    });

    it('not process correctly', () => {
      const model = { x: 1 };
      expect(EVENT_UTILS.processPatchModel(model, true)).toEqual(model);
    });
  });

  describe('getSublabelType', () => {
    it('returns duration for check in', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACCOMMODATION;
      const position = NODE_CONSTANTS.POSITIONS.start;
      expect(EVENT_UTILS.getSublabelType(type, position)).toEqual(
        EVENT_CONSTANTS.SUBLABEL_TYPES.duration,
      );
    });

    it('returns time for check out', () => {
      const { type } = EVENT_CONSTANTS.EVENTS.ACCOMMODATION;
      const position = NODE_CONSTANTS.POSITIONS.end;
      expect(EVENT_UTILS.getSublabelType(type, position)).toEqual(
        EVENT_CONSTANTS.SUBLABEL_TYPES.time,
      );
    });

    it('returns time by default', () => {
      expect(EVENT_UTILS.getSublabelType()).toEqual(
        EVENT_CONSTANTS.SUBLABEL_TYPES.time,
      );
    });
  });

  describe('processBicycleActivity', () => {
    it('should return modified model if activityDetails does exist in the model', () => {
      let model = {};

      model = dotProp.set(
        model,
        EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.activityDetails),
        {
          start: {
            placeId: 1,
            name: 'qqq',
          },
          qq: '2',
        },
      );

      expect(processBicycleActivity(model)).toMatchSnapshot();
    });

    it('should return same model if activityDetails does not exist in the model', () => {
      const model = {};

      expect(processBicycleActivity(model)).toEqual({});
    });
  });

  describe('processCoachModel', () => {
    it('should set end to be the same as start if sameAsOrigin is true', () => {
      let model = {};

      model = dotProp.set(
        model,
        TRANSPORTATION_START_LOC_INPUTS.name,
        'Manila',
      );
      model = dotProp.set(
        model,
        TRANSPORTATION_START_LOC_INPUTS.placeId,
        'PlaceId',
      );
      model = dotProp.set(model, TRANSPORTATION_START_LOC_INPUTS.icon, 'Icon');
      model = dotProp.set(model, 'sameAsOrigin', true);

      const result = processCoachModel(model);

      const start = dotProp.get(result, TRANSPORTATION_START_LOC_INPUTS.start);
      const end = dotProp.get(result, TRANSPORTATION_END_LOC_INPUTS.end);

      expect(start).toEqual(end);
    });

    it('should not modify model if not sameAsOrigin', () => {
      const model = {};
      const result = processCoachModel(model);
      expect(result).toBe(model);
      expect(result).toEqual(model);
    });
  });

  describe('processChangeInTransportationSubType', () => {
    it('should add node if subtype was given', () => {
      const model = {
        data: {
          type: EVENTS.TRANSPORTATION.type,
          detail: {
            type: 'Taxi',
          },
        },
      };

      const result = processChangeInTransportationSubType(model);

      expect(result).toEqual({
        ...model,
        node: {
          type: 'eventtaxi',
        },
      });
    });

    it('should not set a type in node if subtype was not given', () => {
      const model = {
        data: {
          type: EVENTS.TRANSPORTATION.type,
          detail: {
            something: {},
          },
        },
      };

      const result = processChangeInTransportationSubType(model);

      expect(result).toEqual({
        ...model,
      });
    });

    it('should not set a type if type was not transportation', () => {
      const model = {
        data: {
          type: EVENTS.ACTIVITY.type,
          detail: {
            something: {},
          },
        },
      };

      const result = processChangeInTransportationSubType(model);

      expect(result).toEqual({
        ...model,
      });
    });
  });
});
