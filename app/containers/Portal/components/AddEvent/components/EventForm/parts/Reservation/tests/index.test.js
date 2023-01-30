import { shallow } from 'enzyme';
import React from 'react';
import moment from 'moment';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Reservation, defaultValue, defaultBookingDate } from '../index';

describe('defaultValue()', () => {
  it('should return null', () => {
    expect(defaultValue({})).toBe(undefined);
  });

  it('should return yes', () => {
    expect(defaultValue({ editing: true })).toBe('yes');
  });
});

describe('defaultBookingDate()', () => {
  it('should return null', () => {
    expect(defaultBookingDate({})).toBe(null);
  });

  it('should return defaultBookingDate', () => {
    EVENT_VIEW_HELPERS.bookingDate = jest.fn(() => '1990-01-01 01:00:00.000');

    expect(defaultBookingDate({})).toBeDefined();
  });
});

describe('<Reservation />', () => {
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

    rendered = shallow(<Reservation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Reservation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('changeAdding()', () => {
    it('should changeAdding()', () => {
      instance.changeAdding('yes');

      expect(rendered.state().open).toBe('yes');
    });
  });

  describe('handlePickDate()', () => {
    it('should handlePickDate()', () => {
      instance.handlePickDate(moment());

      TEST_HELPERS.expectDefined(rendered.state().bookingDate);
    });
  });

  describe('render()', () => {
    it('should render !adding', () => {
      rendered.setState({ open: 'no' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render adding', () => {
      rendered.setState({ open: 'yes', bookingDate: moment() });

      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
