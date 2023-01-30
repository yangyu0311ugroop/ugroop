import React from 'react';
import { shallow } from 'enzyme';

import { GoogleMaps } from '../index';

describe('GoogleMaps', () => {
  let rendered;
  let instance;

  const placesServiceMock = {
    getDetails: jest.fn(),
  };

  const googleMaps = {
    places: {
      PlacesService: jest.fn(() => placesServiceMock),
      PlacesServiceStatus: {
        OK: 1,
      },
    },
  };

  const props = {
    googleMaps,
    placeId: 'ChIJPUOR-AUiDTkRIZ-jtQ1YfVk',
    children: jest.fn(),
  };

  beforeEach(() => {
    document.createElement = jest.fn(() => 1);
    rendered = shallow(<GoogleMaps {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('componentDidMount', () => {
    it('should call fetchPlaceDetail if placeId exist', () => {
      instance.fetchPlaceDetail = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchPlaceDetail).toBeCalledWith(props.placeId);
    });
    it('should not call fetchPlaceDetail if placeId does not exist', () => {
      rendered.setProps({
        placeId: null,
      });
      instance.fetchPlaceDetail = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchPlaceDetail).not.toBeCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should set state if next placeId is undefined', () => {
      rendered.setState({
        name: 'qqq',
        url: 'qqq',
      });
      rendered.setProps({
        placeId: null,
      });
      expect(rendered.state().name).toBe('');
      expect(rendered.state().url).toBe('');
    });
    it('should call fetchPlaceDetail if placeId is not equal to previous placeId', () => {
      instance.fetchPlaceDetail = jest.fn();
      rendered.setProps({
        placeId: 'QQQQ',
      });
      expect(instance.fetchPlaceDetail).toBeCalledWith('QQQQ');
    });
    it('should do nothing if placeId exist and placeId is the same', () => {
      instance.fetchPlaceDetail = jest.fn();
      rendered.setProps({
        placeId: props.placeId,
      });
      expect(instance.fetchPlaceDetail).not.toBeCalled();
    });
  });

  describe('initService', () => {
    it('should create an instance of PlacesServices', () => {
      instance.initService();
      expect(googleMaps.places.PlacesService).toBeCalledWith(1);
    });
  });

  describe('fetchPlaceDetail', () => {
    it('should not call initService if service is not undefined', () => {
      const getDetails = jest.fn();
      instance.service = {
        getDetails,
      };
      instance.initService = jest.fn();
      instance.fetchPlaceDetail(1);
      expect(instance.initService).not.toBeCalled();
      expect(getDetails).toBeCalledWith(
        { placeId: 1 },
        instance.fetchDetailSuccess,
      );
    });
  });

  describe('fetchDetailSuccess', () => {
    it('should set new state if PlacesServiceStatus is ok', () => {
      instance.fetchDetailSuccess(
        {
          name: 'Heaven',
          url: 'Up Above',
        },
        googleMaps.places.PlacesServiceStatus.OK,
      );

      expect(rendered.state()).toMatchSnapshot();
    });
    it('should not change state if PlacesServiceStatus is not ok', () => {
      instance.fetchDetailSuccess({
        name: 'Heaven',
        url: 'Up Above',
      });

      expect(rendered.state()).toMatchSnapshot();
    });
  });
});
