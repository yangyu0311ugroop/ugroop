import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UID_HELPERS } from 'utils/helpers/uid';
import { GEOCODE_API, GET_LAT_LONG } from 'apis/constants';
import { Map } from '../index';

jest.mock('react-geocode', () => ({
  setApiKey: () => 'setApiKey',
  fromAddress: jest.fn(() => Promise.resolve(1)),
}));

describe('<Map />', () => {
  let rendered;
  let instance;

  const resaga = {
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    const placeIds = [['1', '2']];
    UID_HELPERS.generateUID = jest.fn(() => 123);
    rendered = shallow(<Map resaga={resaga} placeIds={placeIds} />);
    rendered.setState({
      geocodes: [],
      center: null,
      loading: true,
    });
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Map).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should be called', () => {
      const snap = toJSON(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null 1', () => {
      rendered.setProps({
        placeIds: [[{ placeId: null }, { placeId: null }]],
      });
      const snap = toJSON(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null 1', () => {
      rendered.setProps({
        placeIds: [[{ placeId: 'true' }, { placeId: null }]],
      });
      const snap = toJSON(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null if lat & lat is null', () => {
      rendered.setProps({
        singleDayGeocode: {},
        placeIds: [[1]],
      });
      const snap = toJSON(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return something', () => {
      rendered.setProps({
        placeIds: [[{ placeId: '123' }, { placeId: '123' }]],
      });
      const snap = toJSON(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('should call fetchGeocodes if there is only one place', () => {
      rendered.setProps({
        placeIds: [[{ location: 'Manila' }]],
        singleDayGeocode: {
          lat: 1,
          lng: 2,
        },
      });
      instance.fetchGeocode = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchGeocode).toBeCalled();
    });
  });

  describe('fetchGeocodes', () => {
    it('should call GEOCODE_API', () => {
      const placeIds = [[{ location: 'Manila' }]];
      instance.fetchGeocode(placeIds);
      expect(resaga.dispatchTo).toBeCalledWith(GEOCODE_API, GET_LAT_LONG, {
        payload: { location: placeIds[0][0].location },
      });
    });
  });
});
