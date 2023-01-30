import { GOOGLE_TRAVEL_MODES } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Directions } from '../index';

describe('<Directions />', () => {
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

  let route;

  beforeEach(() => {
    route = jest.fn();
    window.google = jest.fn();
    window.google.maps = {
      DirectionsService: jest.fn(() => ({
        route,
      })),
      LatLng: jest.fn(),
      TravelMode: {
        DRIVING: 'driving',
        BICYCLING: 'cycling',
      },
      DirectionsStatus: {
        OK: '',
      },
    };
    rendered = shallow(<Directions {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Directions).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should fetch direction on mount', () => {
      instance.fetchDirections = jest.fn();
      instance.componentDidMount();

      expect(instance.fetchDirections).toBeCalled();
    });
  });

  describe('componentDidUpdate', () => {
    it('should call fetchDirections if previos location is different from the current location', () => {
      instance.fetchDirections = jest.fn();

      rendered.setProps({
        from: {
          placeId: 111,
        },
      });

      expect(instance.fetchDirections).toBeCalled();
    });
  });

  describe('getDirections', () => {
    it('should set directions state to whatever the result was', () => {
      instance.getDirections([], '');

      expect(rendered.state().directions).toEqual([]);
    });

    it('should not state direction state to whatever the result was if status is not equal to OK', () => {
      instance.getDirections([], 'error');

      expect(rendered.state().directions).toBeNull();
    });
  });

  describe('getTravelMode', () => {
    it('should return travel mode bicycling if trave mode is cycling', () => {
      rendered.setProps({
        travelMode: GOOGLE_TRAVEL_MODES.CYCLING,
      });

      expect(instance.getTravelMode()).toEqual(
        window.google.maps.TravelMode.BICYCLING,
      );
    });

    it('should return travel mode bicycling if trave mode is driving', () => {
      rendered.setProps({
        travelMode: GOOGLE_TRAVEL_MODES.DRIVING,
      });

      expect(instance.getTravelMode()).toEqual(
        window.google.maps.TravelMode.DRIVING,
      );
    });
  });

  describe('fetchDirections', () => {
    it('should call direction service route if props from and props to have value', () => {
      rendered.setProps({
        from: {
          placeId: 1,
        },
        to: {
          placeId: 2,
        },
      });
      instance.fetchDirections();

      expect(window.google.maps.DirectionsService).toBeCalled();
      expect(window.google.maps.DirectionsService.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setState({
        directions: [],
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render null if setter', () => {
      rendered.setProps({
        setter: true,
      });
      expect(instance.render()).toEqual(null);
    });

    it('should render correctly if directions state is null', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
