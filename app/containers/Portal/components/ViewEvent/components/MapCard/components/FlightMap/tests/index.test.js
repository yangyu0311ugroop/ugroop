import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightMap } from '../index';

describe('<FlightMap />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const queue = {
    contents: [],
    add: jest.fn(),
    next: jest.fn(),
    clear: jest.fn(),
  };
  const findPlaces = jest.fn();
  const findDetail = jest.fn();

  const props = {
    classes: {},
    resaga,
    findPlaces,
    findDetail,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<FlightMap {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FlightMap).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should componentWillUnmount()', () => {
      instance.queue = queue;

      instance.componentWillUnmount();

      TEST_HELPERS.expectCalled(instance.queue.clear);
    });
  });

  describe('enqueue()', () => {
    it('should return null', () => {
      expect(instance.enqueue()).toBe(null);
    });

    it('should enqueue', () => {
      instance.queue = queue;

      instance.enqueue(jest.fn());

      TEST_HELPERS.expectCalled(instance.queue.add);
      TEST_HELPERS.expectCalled(instance.queue.next);
    });
  });

  describe('next()', () => {
    it('should not next()', () => {
      instance.queue = queue;
      instance.queue.contents = [];

      instance.next();

      TEST_HELPERS.expectNotCalled(instance.queue.next);
    });

    it('should next()', () => {
      instance.queue = queue;
      instance.queue.contents = [1];

      instance.next();

      TEST_HELPERS.expectCalled(instance.queue.next);
    });
  });

  describe('findPlace()', () => {
    it('should findPlace()', () => {
      instance.findPlaceCb = jest.fn(() => () => 'findPlaceCb');

      instance.findPlace('input')();

      TEST_HELPERS.expectCalled(findPlaces);
    });
  });

  describe('findPlaceCb()', () => {
    it('should return status not OK', () => {
      instance.enqueue = jest.fn();
      instance.findDetail = jest.fn();

      instance.findPlaceCb('input')([], 'ERROR');

      TEST_HELPERS.expectNotCalled(instance.enqueue);
      TEST_HELPERS.expectNotCalled(instance.findDetail);
    });

    it('should return status OK', () => {
      instance.enqueue = jest.fn();
      instance.findDetail = jest.fn();

      instance.findPlaceCb('input')([], 'OK');

      TEST_HELPERS.expectCalled(instance.enqueue);
      TEST_HELPERS.expectCalled(instance.findDetail);
    });
  });

  describe('findDetail()', () => {
    it('should findDetail()', () => {
      instance.findDetailCb = jest.fn();

      instance.findDetail()();

      TEST_HELPERS.expectCalled(findDetail);
    });
  });

  describe('findDetailCb()', () => {
    it('should findDetailCb() !geocode', () => {
      ROUTE_HELPERS.normalisePlaceGeocode = jest.fn(() => false);
      instance.next = jest.fn();

      instance.findDetailCb()();

      TEST_HELPERS.expectCalled(instance.next);
    });

    it('should findDetailCb() status !OK', () => {
      ROUTE_HELPERS.normalisePlaceGeocode = jest.fn(() => ({}));
      instance.next = jest.fn();

      instance.findDetailCb()({}, 'ERROR');

      TEST_HELPERS.expectCalled(instance.next);
    });

    it('should findDetailCb() setState', () => {
      ROUTE_HELPERS.normalisePlaceGeocode = jest.fn(() => ({}));
      instance.next = jest.fn();

      instance.findDetailCb('input')({}, 'OK');

      TEST_HELPERS.expectCalled(instance.next);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setState({ fetchedPlaceData: {} });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render mapOnly', () => {
      rendered.setProps({ mapOnly: true });

      ROUTE_HELPERS.haversineDistance = jest.fn(() => 123);
      EVENT_VIEW_HELPERS.airportStart = jest.fn(() => 1);
      EVENT_VIEW_HELPERS.airportEnd = jest.fn(() => 2);

      rendered.setState({ fetchedPlaceData: { 1: {}, 2: {} } });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      ROUTE_HELPERS.haversineDistance = jest.fn(() => 123);
      EVENT_VIEW_HELPERS.airportStart = jest.fn(() => 1);
      EVENT_VIEW_HELPERS.airportEnd = jest.fn(() => 2);

      rendered.setState({ fetchedPlaceData: { 1: {}, 2: {} } });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
