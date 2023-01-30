import { GOOGLE_API_KEYS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Map } from '../index';

describe('<Map />', () => {
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
    rendered = shallow(<Map {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Map).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount', () => {
    it('should set distance, dropoff and pickup values to null', () => {
      instance.componentWillUnmount();

      expect(resaga.setValue).toBeCalledWith({
        distance: null,
        pickup: null,
        dropoff: null,
      });
    });
  });

  describe('handleDirectionChange', () => {
    it('should set value the distance form and event distance', () => {
      instance.handleDirectionChange('eventDistance')({
        routes: [{ legs: [{ distance: { value: '123' } }] }],
      });

      expect(resaga.setValue).toBeCalledWith({
        eventDistance: '123',
      });
    });

    it('should not hasDirection state to false if distance is null', () => {
      rendered.setState({
        hasDirection: true,
      });
      instance.handleDirectionChange('eventDistance')({
        routes: [],
      });

      expect(rendered.state().hasDirection).toBe(false);
    });
  });

  describe('getGoogleMapsURL', () => {
    it('should return something', () => {
      GOOGLE_API_KEYS.GOOGLE_MAPS_URL = undefined;

      expect(instance.getGoogleMapsURL()).toBeDefined();
    });

    it('should return google maps url env value if it has value', () => {
      GOOGLE_API_KEYS.GOOGLE_MAPS_URL = 'aabb';

      expect(instance.getGoogleMapsURL()).toBe('aabb');
    });
  });

  describe('handleField', () => {
    beforeEach(() => {
      instance.getGoogleMapsURL = jest.fn(() => 'aaaa');
    });
    it('should match snapshot', () => {
      rendered.setProps({
        formPickup: { placeId: '1111' },
        formDropoff: { placeId: '1112' },
      });
      const snapshot = shallow(<div>{instance.handleField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return null if formPickip or formDropoff is null', () => {
      rendered.setProps({
        formPickup: null,
        formDropoff: { placeId: 1 },
      });
      expect(instance.handleField()).toEqual(null);
    });
    it('should return null if formPickip and formDropoff is equal', () => {
      rendered.setProps({
        formPickup: { placeId: 1 },
        formDropoff: { placeId: 1 },
      });
      expect(instance.handleField()).toEqual(null);
    });
  });

  describe('handleEditable', () => {
    beforeEach(() => {
      instance.getGoogleMapsURL = jest.fn(() => 'aaaa');
    });
    it('should match snapshot', () => {
      rendered.setProps({
        eventPickup: { placeId: 111 },
        eventDropoff: { placeId: 222 },
      });
      const snapshot = shallow(<div>{instance.handleEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return null if dropoffPlaceId is equal to pickupPlaceId', () => {
      rendered.setProps({
        eventPickup: { placeId: 1 },
        eventDropoff: { placeId: 1 },
      });
      expect(instance.handleEditable()).toEqual(null);
    });

    it('should return null if there is not dropoffPlaceId or pickupPlaceId', () => {
      rendered.setProps({
        eventPickup: null,
        eventDropoff: { placeId: 1 },
      });
      expect(instance.handleEditable()).toEqual(null);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
