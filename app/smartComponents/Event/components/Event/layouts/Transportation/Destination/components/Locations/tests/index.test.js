import { GEOCODE_API, GET_PLACE_IDS } from 'apis/constants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TransportationLocations } from '../index';

describe('<TransportationLocations />', () => {
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
    rendered = shallow(<TransportationLocations {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(TransportationLocations).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should should dispatch if data length is greater than 0', () => {
      rendered.setProps({
        pickupName: 'pickupName',
        pickupPlaceId: 'pickupPlaceId',
        dropoffName: 'dropoffName',
        dropoffPlaceId: 'dropoffPlaceId',
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

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderEndLocAndTimeField = jest.fn(
        () => 'renderEndLocAndTimeField',
      );
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render null if setter is true', () => {
      rendered.setProps({
        setter: true,
      });
      expect(instance.render()).toEqual(null);
    });
  });

  describe('handleSwap', () => {
    it('should call TEMPLATE_API_HELPERS.patchEvent', () => {
      rendered.setProps({
        pickupName: 'PLM',
        pickupPlaceId: 123,
        dropoffName: 'LPU',
        dropoffPlaceId: 456,
        type: 'Transportation',
        subtype: 'Cycling',
      });
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSwap();
      expect(TEMPLATE_API_HELPERS.patchEvent).toHaveBeenCalled();
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

  describe('handleSwapSuccess', () => {
    it('should call updateTimes', () => {
      instance.updateTimes = jest.fn();
      instance.handleSwapSuccess({ raw: {} });
      expect(instance.updateTimes).toHaveBeenCalled();
    });
  });
});
