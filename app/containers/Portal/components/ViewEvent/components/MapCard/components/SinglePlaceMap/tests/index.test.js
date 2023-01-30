import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { SinglePlaceMap } from '../index';

describe('<SinglePlaceMap />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const findDetail = jest.fn();

  const props = {
    classes: {},
    resaga,
    findDetail,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<SinglePlaceMap {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SinglePlaceMap).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('findDetail()', () => {
    it('should return null', () => {
      expect(instance.findDetail()).toBe(null);
    });

    it('should findDetail()', () => {
      instance.findDetailCb = jest.fn();

      instance.findDetail('placeId');

      TEST_HELPERS.expectCalled(findDetail);
    });
  });

  describe('findDetailCb()', () => {
    it('should !geocode', () => {
      ROUTE_HELPERS.normalisePlaceGeocode = jest.fn(() => false);

      expect(instance.findDetailCb()).toBe(null);
    });

    it('should !OK', () => {
      ROUTE_HELPERS.normalisePlaceGeocode = jest.fn(() => ({}));

      expect(instance.findDetailCb({}, 'ERROR')).toBe(null);
    });

    it('should setState', () => {
      ROUTE_HELPERS.normalisePlaceGeocode = jest.fn(() => 1);
      ROUTE_HELPERS.normalisePlaceViewport = jest.fn(() => 2);

      instance.findDetailCb({}, 'OK');

      expect(rendered.state().geocode).toBe(1);
      expect(rendered.state().viewport).toBe(2);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setState({ geocode: {} });
      EVENT_VIEW_HELPERS.locationName = jest.fn(() => 'locationName');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render mapOnly', () => {
      rendered.setProps({ mapOnly: true });
      rendered.setState({ geocode: {} });

      EVENT_VIEW_HELPERS.locationName = jest.fn(() => 'locationName');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
