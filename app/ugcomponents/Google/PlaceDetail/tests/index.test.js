import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import moment from 'moment';
import * as timeZoneHelpers from 'utils/helpers/timeZone';
import { PlaceDetail } from '..';

describe('<PlaceDetail />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  class PlacesService {
    getDetails = jest.fn();
  }
  const googleMaps = {
    places: {
      PlacesService,
      PlacesServiceStatus: { OK: 'OK' },
    },
  };

  const props = {
    classes: {},
    resaga,
    googleMaps,
  };

  window.UGROOP_GLOBAL_VARS = {
    googleTimezones: {},
    googlePlaces: {},
  };

  beforeEach(() => {
    rendered = shallow(<PlaceDetail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PlaceDetail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should not call fetchPlaceDetail if no placeId', () => {
      rendered.setProps({ placeId: '' });

      instance.fetchPlaceDetail = jest.fn();
      instance.componentDidMount();

      expect(instance.fetchPlaceDetail).not.toBeCalled();
    });

    it('should call fetchPlaceDetail if placeId exist', () => {
      rendered.setProps({ placeId: 'abcd' });

      instance.fetchPlaceDetail = jest.fn();
      instance.componentDidMount();

      expect(instance.fetchPlaceDetail).toBeCalledWith('abcd');
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should not call fetchPlaceDetail if placeId not changed', () => {
      rendered.setProps({ placeId: 'ssss' });

      instance.fetchPlaceDetail = jest.fn();
      instance.componentWillReceiveProps({ placeId: 'ssss' });

      expect(instance.fetchPlaceDetail).not.toBeCalled();
    });

    it('should call fetchPlaceDetail if placeId changed', () => {
      rendered.setProps({ placeId: 'ssss' });

      instance.fetchPlaceDetail = jest.fn();
      instance.componentWillReceiveProps({ placeId: 'xxxxx' });

      expect(instance.fetchPlaceDetail).toBeCalledWith('xxxxx');
    });
  });

  describe('initService()', () => {
    it('return null', () => {
      rendered.setProps({
        googleMaps: {
          places: null,
        },
      });

      expect(instance.initService()).toBe(null);
    });

    it('should call google service', () => {
      instance.initService();

      expect(instance.service).toMatchSnapshot();
    });
  });

  describe('handleClose', () => {
    it('should call onClose if onClose is function', () => {
      const onClose = jest.fn();
      rendered.setProps({
        onClose,
      });
      instance.handleClose();

      expect(onClose).toBeCalled();
    });
  });

  describe('fetchPlaceDetail()', () => {
    it('return null', () => {
      rendered.setProps({
        googleMaps: {
          places: null,
        },
      });

      expect(instance.fetchPlaceDetail()).toBe(null);
    });

    it('should call google service getDetails', () => {
      const mock2 = jest.fn();
      const mock = jest.fn(() => mock2);
      rendered.setProps({ handleChange: mock });

      instance.service = { getDetails: jest.fn() };
      instance.fetchPlaceDetail('abc123');

      expect(mock).toBeCalledWith('placeId');
      expect(mock2).toBeCalledWith('abc123');

      expect(instance.service.getDetails).toBeCalled();
      expect(instance.service.getDetails.mock.calls).toMatchSnapshot();
    });
    it('should call fetchTimeZoneSuccess when data is cache', () => {
      window.UGROOP_GLOBAL_VARS = {
        googleTimezones: { abc123: { test: 1 } },
        googlePlaces: { abc123: { test: 1 } },
      };
      /* const mock2 = jest.fn();
      const mock = jest.fn(() => mock2);
      /*rendered.setProps({ handleChange: mock });

      instance.service = { getDetails: jest.fn() };
      instance.fetchPlaceDetail('abc123');

      expect(mock).toBeCalledWith('placeId');
      expect(mock2).toBeCalledWith('abc123'); */
      instance.fetchTimeZoneSuccess = jest.fn(() => jest.fn());

      instance.fetchPlaceDetail('abc123');
      expect(instance.fetchTimeZoneSuccess).toBeCalled();
      // expect(instance.service.getDetails.mock.calls).toMatchSnapshot();
    });
  });

  describe('fetchDetailSuccess()', () => {
    beforeEach(() => {
      instance.fetchPlaceTimeZone = jest.fn();
    });

    it('calls fetchPlaceTimeZone for OK status', () => {
      const place = { id: 123 };
      instance.fetchDetailSuccess(1)(place, 'OK');
      expect(instance.fetchPlaceTimeZone).toBeCalledWith(place);
    });
    it('unsets state.loading for not OK status', () => {
      const place = { id: 123 };
      instance.setState = jest.fn();
      instance.fetchDetailSuccess(1)(place, 'NOT OK');
      expect(instance.setState).toBeCalledWith(
        expect.objectContaining({
          loading: false,
        }),
      );
    });
  });

  describe('fetchPlaceTimeZone()', () => {
    beforeEach(() => {
      timeZoneHelpers.default = {
        fetchTimeZone: jest.fn((...args) => args),
      };
    });

    it('should call google maps timezone api', () => {
      const place = {
        geometry: {
          location: {
            lat: () => 123,
            lng: () => 456,
          },
        },
      };
      expect(instance.fetchPlaceTimeZone(place)).toMatchSnapshot();
    });
  });

  describe('fetchTimeZoneSuccess()', () => {
    it('sets place state and unsets state.loading', () => {
      const place = {
        name: 'name',
        formatted_address: 'formatted_address',
        address_components: [
          { short_name: 'PH', long_name: 'Philippines', types: ['country'] },
        ],
        icon: 'icon',
        utc_offset: 'utc_offset',
        website: 'website',
        url: 'url',
        formatted_phone_number: 'formatted_phone_number',
        opening_hours: 0,
        photos: 123,
      };
      const result = {
        status: 'OK',
        timeZoneId: 'timeZoneId',
      };
      instance.setState = jest.fn();
      instance.fetchTimeZoneSuccess(place)(null, result, true);
      expect(instance.setState.mock.calls).toMatchSnapshot();
    });

    it('calls props.handleChange()', () => {
      const place = {
        icon: 'icon',
        address_components: [
          { short_name: 'PH', long_name: 'Philippines', types: ['country'] },
        ],
      };
      const result = {
        status: 'OK',
        timeZoneId: 'timeZoneId',
      };
      rendered.setProps({
        handleChange: jest
          .fn()
          .mockImplementation(key =>
            jest.fn().mockImplementation(value => ({ key, value })),
          ),
      });
      instance.fetchTimeZoneSuccess(place)(null, result);
      expect(instance.props.handleChange.mock.calls).toMatchSnapshot();
    });

    it('sets latitude and longitude', () => {
      const place = {
        geometry: {
          location: {
            lat: () => 1,
            lng: () => 1,
          },
        },
        address_components: [
          { short_name: 'PH', long_name: 'Philippines', types: ['country'] },
        ],
      };
      const result = {
        status: 'OK',
        timeZoneId: 'timeZoneId',
      };
      rendered.setProps({
        handleChange: jest
          .fn()
          .mockImplementation(key =>
            jest.fn().mockImplementation(value => ({ key, value })),
          ),
      });
      instance.fetchTimeZoneSuccess(place)(null, result);
    });

    it('not sets place state if status not OK', () => {
      const result = { status: 'NOT OK' };
      instance.setState = jest.fn();
      instance.fetchTimeZoneSuccess()(null, result);
      expect(instance.setState.mock.calls).toMatchSnapshot();
    });

    it('not calls props.handleChange() if status not OK', () => {
      const result = { status: 'NOT OK' };
      rendered.setProps({ handleChange: jest.fn() });
      instance.fetchTimeZoneSuccess()(null, result);
      expect(instance.props.handleChange).not.toBeCalled();
    });
  });

  describe('getGoogleDoW()', () => {
    it('should return 6', () => {
      expect(instance.getGoogleDoW(0)).toBe(6);
    });
    it('should return -1', () => {
      expect(instance.getGoogleDoW(1)).toBe(0);
      expect(instance.getGoogleDoW(2)).toBe(1);
      expect(instance.getGoogleDoW(3)).toBe(2);
      expect(instance.getGoogleDoW(4)).toBe(3);
      expect(instance.getGoogleDoW(5)).toBe(4);
      expect(instance.getGoogleDoW(6)).toBe(5);
    });
  });

  describe('handleMouseEnter()', () => {
    it('should call onMouseEnter', () => {
      const mock = jest.fn();
      rendered.setProps({ onMouseEnter: mock });

      instance.handleMouseEnter('abc123');

      expect(mock).toBeCalledWith('abc123');
    });
    it('should NOT call onMouseEnter', () => {
      const mock = jest.fn();

      instance.handleMouseEnter('abc123');

      expect(mock).not.toBeCalledWith('abc123');
    });
  });

  describe('handleMouseLeave()', () => {
    it('should call onMouseLeave', () => {
      const mock = jest.fn();
      rendered.setProps({ onMouseLeave: mock });

      instance.handleMouseLeave('abc123');

      expect(mock).toBeCalledWith('abc123');
    });
    it('should NOT call onMouseLeave', () => {
      const mock = jest.fn();

      instance.handleMouseLeave('abc123');

      expect(mock).not.toBeCalledWith('abc123');
    });
  });

  describe('renderWebsite()', () => {
    it('should render correctly', () => {
      rendered.setState({
        website: 'http://website.com/this/should/be/removed',
      });

      expect(instance.renderWebsite()).toBe('http://website.com');
    });

    it('should not return anything', () => {
      rendered.setState({ website: undefined });

      expect(instance.renderWebsite()).toBe(undefined);
    });

    it('handles invalid website', () => {
      const website = 'notAWebsite';
      rendered.setState({ website });

      expect(instance.renderWebsite()).toBe(website);
    });
  });

  describe('renderImage()', () => {
    it('should render correctly', () => {
      const getUrl = jest.fn(() => 'image url');
      rendered.setState({ photos: [{ getUrl }] });

      const snapshot = shallow(<div>{instance.renderImage()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(getUrl).toBeCalledWith({ maxWidth: 400, maxHeight: 400 });
    });
  });

  describe('renderCurrentTime', () => {
    it('returns falsy when hidden', () => {
      rendered.setProps({ hideCurrentTime: true });
      expect(instance.renderCurrentTime()).toBeFalsy();
    });
  });

  describe('renderDetail()', () => {
    it('still matches snapshot', () => {
      instance.setState({
        timeZoneId: 'America/Los_Angeles',
        website: 'website',
        phone: 'phone',
        url: 'url',
      });
      instance.renderWebsite = jest.fn(() => 'renderWebsite');
      instance.renderCurrentTime = jest.fn(() => 'renderCurrentTime');
      const timeMoment = moment.utc('1234-12-21 13:34:56.789');
      expect(instance.renderDetail(timeMoment)).toMatchSnapshot();
    });
  });
  describe('handleViewMap', () => {
    it('returns falsy when hidden', () => {
      expect(
        instance.handleViewMap({ stopPropagation: jest.fn() }),
      ).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('still matches snapshot when hiding', () => {
      rendered.setProps({ hide: true });
      instance.renderImage = jest.fn(() => 'renderImage');
      instance.renderDetail = jest.fn(() => 'renderDetail');
      expect(instance.render()).toBeDefined();
    });

    it('still matches snapshot when loading', () => {
      instance.setState({ loading: true });
      instance.renderImage = jest.fn(() => 'renderImage');
      instance.renderDetail = jest.fn(() => 'renderDetail');
      expect(instance.render()).toBeDefined();
    });

    it('still matches snapshot when no address', () => {
      instance.setState({ name: 'name', address: null });
      instance.renderImage = jest.fn(() => 'renderImage');
      instance.renderDetail = jest.fn(() => 'renderDetail');
      expect(instance.render()).toBeDefined();
    });

    it('still matches snapshot when name and address', () => {
      instance.setState({
        name: 'name',
        address: 'address',
        timeZoneId: 'America/Los_Angeles',
      });
      instance.renderImage = () => 'image';
      instance.renderDetail = () => 'detail';
      expect(instance.render()).toBeDefined();
    });
  });
});
