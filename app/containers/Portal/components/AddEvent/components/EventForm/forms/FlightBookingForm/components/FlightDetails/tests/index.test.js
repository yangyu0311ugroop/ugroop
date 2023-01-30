import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightDetails } from '../index';

describe('<FlightDetails />', () => {
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

    rendered = shallow(<FlightDetails {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FlightDetails).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('setAdding()', () => {
    it('should setAdding()', () => {
      instance.setAdding();

      expect(rendered.state().adding).toBe(true);
    });
  });

  describe('cancelAdding()', () => {
    it('should cancelAdding()', () => {
      instance.cancelAdding();

      expect(rendered.state().adding).toBe(false);
    });
  });

  describe('setTravelClass()', () => {
    it('should setTravelClass()', () => {
      instance.setTravelClass('123');

      expect(rendered.state().travelClass).toBe('123');
    });
  });

  describe('setAirline()', () => {
    it('should setAirline()', () => {
      instance.setAirline({ target: { value: '123' } });

      expect(rendered.state().airline).toBe('123');
    });
  });

  describe('setDescription()', () => {
    it('should setDescription()', () => {
      instance.setDescription('123');

      expect(rendered.state().description).toBe('123');
    });
  });

  describe('setFlightNumber()', () => {
    it('should setFlightNumber()', () => {
      instance.setFlightNumber({ target: { value: '123' } });

      expect(rendered.state().flightNumber).toBe('123');
    });
  });

  describe('setTerminal()', () => {
    it('should setTerminal()', () => {
      instance.setTerminal({ target: { value: '123' } });

      expect(rendered.state().terminal).toBe('123');
    });
  });

  describe('setGate()', () => {
    it('should setGate()', () => {
      instance.setGate({ target: { value: '123' } });

      expect(rendered.state().gate).toBe('123');
    });
  });

  describe('saveDetail()', () => {
    it('should saveDetail()', () => {
      instance.saveDetail();

      expect(rendered.state().adding).toBe(false);
    });
  });

  describe('render()', () => {
    it('should return adding', () => {
      rendered.setState({ adding: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render empty', () => {
      rendered.setState({
        adding: false,
        travelClass: '',
        airline: '',
        flightNumber: '',
        terminal: '',
        gate: '',
      });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      rendered.setState({
        adding: false,
        travelClass: 'travelClass',
        airline: 'airline',
        flightNumber: 'flightNumber',
        terminal: 'terminal',
        gate: 'gate',
      });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
