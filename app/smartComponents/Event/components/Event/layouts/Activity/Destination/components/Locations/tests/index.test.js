import { GEOCODE_API, GET_PLACE_IDS } from 'apis/constants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { ActivityLocations } from '../index';

describe('<ActivityLocations />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<ActivityLocations {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(ActivityLocations).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should should dispatch if data length is greater than 0', () => {
      rendered.setProps({
        startValue: JSON.stringify({
          name: 'pickupName',
          placeId: 'pickupPlaceId',
        }),
        endValue: JSON.stringify({
          name: 'dropoffName',
          placeId: 'dropoffPlaceId',
        }),
      });
      instance.handleSuccess = jest.fn(() => 'handleSuccess');
      instance.componentDidMount();

      expect(resaga.dispatchTo).toBeCalledWith(GEOCODE_API, GET_PLACE_IDS, {
        payload: {
          locations: [
            { location: 'pickupName', placeId: 'pickupPlaceId' },
            { location: 'dropoffName', placeId: 'dropoffPlaceId' },
          ],
        },
        onSuccess: 'handleSuccess',
      });
    });

    it('should not call dispatchTo if data length is not greater than 0', () => {
      instance.handleSuccess = jest.fn(() => 'handleSuccess');
      instance.componentDidMount();

      expect(resaga.dispatchTo).not.toBeCalled();
    });
  });

  describe('handleSuccess', () => {
    it('should should set redux value based on pickup and dropoff object', () => {
      const pickup = {
        name: 'First Place',
      };
      const dropoff = {
        name: 'Second Place',
      };
      instance.handleSuccess(1, 2)({
        geocodes: {
          1: pickup,
          2: dropoff,
        },
      });

      expect(resaga.setValue).toBeCalledWith({
        eventPickup: pickup,
        eventDropoff: dropoff,
        formPickup: pickup,
        formDropoff: dropoff,
      });
    });
  });

  describe('updateTimes', () => {
    it('should call NODE_API_HELPERS.getTimes', () => {
      NODE_API_HELPERS.getTimes = jest.fn();
      instance.updateTimes();
      expect(NODE_API_HELPERS.getTimes).toHaveBeenCalled();
    });
  });

  describe('handleSelect', () => {
    it('should call dispatchTo and setValue', () => {
      const data = {
        description: 'nice',
      };
      instance.handleSelect('distance')(data);
      expect(resaga.setValue).toHaveBeenCalled();
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
    it('should call dispatchTo and setValue if there is no name', () => {
      const data = {
        description: '',
      };
      instance.handleSelect('distance')(data);
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('getLocationDetails', () => {
    it('should return name and placeId', () => {
      const startVal = {
        name: 'PLM',
        placeId: 123,
      };
      const endVal = {
        name: 'LPU',
        placeId: 456,
      };
      const startJSON = JSON.stringify(startVal);
      const endJSON = JSON.stringify(endVal);
      const raw = {
        id: 72,
        type: 'Acitivity',
        detail: {
          type: 'Match',
          activityDetails: [
            {
              id: 9,
              key: 'start',
              value: startJSON,
            },
            {
              id: 10,
              key: 'end',
              value: endJSON,
            },
          ],
        },
      };

      expect(instance.getLocationDetails('end', raw)).toEqual({
        name: 'LPU',
        placeId: '',
      });
      expect(instance.getLocationDetails('start', raw)).toEqual({
        name: 'PLM',
        placeId: '',
      });
    });
  });

  describe('handleSwapSuccess', () => {
    it('should call handleSelect and updateTimes', () => {
      const startVal = {
        name: 'PLM',
        placeId: 123,
      };
      const endVal = {
        name: 'LPU',
        placeId: 456,
      };
      const startJSON = JSON.stringify(startVal);
      const endJSON = JSON.stringify(endVal);
      const raw = {
        id: 72,
        type: 'Acitivity',
        detail: {
          type: 'Match',
          activityDetails: [
            {
              id: 9,
              key: 'start',
              value: startJSON,
            },
            {
              id: 10,
              key: 'end',
              value: endJSON,
            },
          ],
        },
      };

      instance.updateTimes = jest.fn();
      instance.handleSwapSuccess({ raw });
      expect(instance.updateTimes).toHaveBeenCalled();
    });
  });

  describe('handleSwap', () => {
    it('should call TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      const startVal = {
        name: 'PLM',
        placeId: 123,
      };
      const endVal = {
        name: 'LPU',
        placeId: 456,
      };
      const startJSON = JSON.stringify(startVal);
      const endJSON = JSON.stringify(endVal);

      rendered.setProps({
        startValue: startJSON,
        endValue: endJSON,
        type: 'Activity',
        subtype: 'Match',
      });
      instance.handleSwap();
      expect(TEMPLATE_API_HELPERS.patchEvent).toHaveBeenCalled();
    });
  });

  describe('parseValue', () => {
    it('should return empty object if isEmptyString', () => {
      rendered.setProps({
        value: '',
      });
      expect(instance.parseValue()).toEqual({});
    });
  });
});
