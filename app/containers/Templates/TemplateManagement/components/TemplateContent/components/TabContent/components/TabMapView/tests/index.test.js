import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { TabMapView } from '../index';

describe('<TabMapView />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    dayIds: [1, 2, 3],
    existingPlaceIds: [1, 2, 3],
    placeIds: ['1', '2', '3'],
    locations: [],
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TabMapView {...props} />);
    instance = rendered.instance();
  });
  describe('getMapURL()', () => {
    it('should return google url correctly', () => {
      const result = instance.getMapURL();
      expect(result).toBeDefined();
    });
  });
  it('should exists', () => {
    expect(TabMapView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.getMapURL = jest.fn(() => 'getMapURL');
      rendered.setProps({
        locations: ['1'],
      });
      instance.getMapURL = jest.fn(() => 'getMapURL');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render nothing if there is no location', () => {
      instance.getMapURL = jest.fn(() => 'getMapURL');
      rendered.setProps({
        locations: [],
      });
      instance.renderNoContent = jest.fn(() => 'renderNoContent');
      expect(instance.render()).toEqual('renderNoContent');
    });
  });

  describe('getConsecutiveLocations', () => {
    it('should push value only if arr.length === 1', () => {
      instance.getMapURL = jest.fn(() => 'getMapURL');
      const arr = ['Manila'];
      const value = 'Manila';
      const res = [];
      const index = 0;
      expect(instance.getConsecutiveLocations(res, value, index, arr)).toEqual([
        ['Manila'],
      ]);
    });
    it('should push if arr.length - 1 > index', () => {
      const res = [];
      const arr = [
        { placeId: 1, location: 'Manila' },
        { placeId: 2, location: 'QC' },
      ];
      const index = 0;
      const value = { placeId: 1, location: 'Manila' };
      expect(instance.getConsecutiveLocations(res, value, index, arr)).toEqual([
        [{ placeId: 1, location: 'Manila' }, { placeId: 2, location: 'QC' }],
      ]);
    });
    it('should return res if no conditions are met', () => {
      const res = [];
      const arr = [
        { placeId: 1, location: 'Manila' },
        { placeId: 2, location: 'QC' },
      ];
      const index = 1;
      const value = { placeId: 1, location: 'Manila' };
      expect(instance.getConsecutiveLocations(res, value, index, arr)).toEqual(
        [],
      );
    });
  });

  describe('getLocationsWithoutGeocode', () => {
    it('should be called if there are no geocodes', () => {
      rendered.setProps({
        geocodes: [],
      });
      const locations = [['1', 'Manila'], ['2', 'Tokyo'], ['3', 'Brisbane']];
      instance.getLocationsWithoutGeocode(locations);
    });
    it('should be called if there are geocodes', () => {
      rendered.setProps({
        geocodes: [
          { placeId: '1', location: 'Manila' },
          { placeId: '2', location: 'Tokyo' },
          { placeId: '3', location: 'Brisbane' },
        ],
      });
      const locations = [['1', 'Manila'], ['2', 'Tokyo'], ['3', 'Brisbane']];
      instance.getLocationsWithoutGeocode(locations);
    });
  });
});
