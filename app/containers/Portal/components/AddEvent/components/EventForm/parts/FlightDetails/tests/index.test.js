import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightDetails, defaultValue } from '../index';

describe('defaultValue()', () => {
  it('should return null', () => {
    EVENT_VIEW_HELPERS.travelClass = jest.fn(() => '');
    EVENT_VIEW_HELPERS.airline = jest.fn(() => '');
    EVENT_VIEW_HELPERS.flightNumber = jest.fn(() => '');
    EVENT_VIEW_HELPERS.terminal = jest.fn(() => '');
    EVENT_VIEW_HELPERS.gate = jest.fn(() => '');

    expect(defaultValue({})).toBe('');
  });

  it('should return value', () => {
    EVENT_VIEW_HELPERS.travelClass = jest.fn(() => '');
    EVENT_VIEW_HELPERS.airline = jest.fn(() => '');
    EVENT_VIEW_HELPERS.flightNumber = jest.fn(() => '');
    EVENT_VIEW_HELPERS.terminal = jest.fn(() => '');
    EVENT_VIEW_HELPERS.gate = jest.fn(() => '42');

    expect(defaultValue({})).toBeDefined();
  });
});

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

  describe('render()', () => {
    it('should render !adding', () => {
      rendered.setState({ adding: false });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render adding', () => {
      rendered.setState({ adding: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
