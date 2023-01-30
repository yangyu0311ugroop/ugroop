import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightDetailsCard } from '../index';

describe('<FlightDetailsCard />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<FlightDetailsCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FlightDetailsCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderTravelClass()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.travelClass = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTravelClass);
    });

    it('should renderTravelClass', () => {
      EVENT_VIEW_HELPERS.travelClass = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTravelClass);
    });
  });

  describe('renderAirline()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.airline = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAirline);
    });

    it('should renderAirline', () => {
      EVENT_VIEW_HELPERS.airline = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAirline);
    });
  });

  describe('renderFlightNumber()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.flightNumber = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightNumber);
    });

    it('should renderFlightNumber', () => {
      EVENT_VIEW_HELPERS.flightNumber = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightNumber);
    });
  });

  describe('renderTerminal()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.terminal = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTerminal);
    });

    it('should renderTerminal', () => {
      EVENT_VIEW_HELPERS.terminal = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTerminal);
    });
  });

  describe('renderGate()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.gate = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderGate);
    });

    it('should renderGate', () => {
      EVENT_VIEW_HELPERS.gate = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderGate);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.hasData = jest.fn(() => false);

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      instance.hasData = jest.fn(() => true);
      instance.renderTravelClass = jest.fn(() => 'renderTravelClass');
      instance.renderAirline = jest.fn(() => 'renderAirline');
      instance.renderFlightNumber = jest.fn(() => 'renderFlightNumber');
      instance.renderTerminal = jest.fn(() => 'renderTerminal');
      instance.renderGate = jest.fn(() => 'renderGate');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
