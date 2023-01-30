import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Location, defaultValue } from '../index';

describe('defaultValue()', () => {
  it('should return null', () => {
    expect(defaultValue({})).toEqual({});
  });

  it('should return isTransportation end', () => {
    EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);

    expect(defaultValue({ data: {}, node: {}, position: 'end' })).toBeDefined();
  });

  it('should return isTransportation start', () => {
    EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);

    expect(
      defaultValue({ data: {}, node: {}, position: 'start' }),
    ).toBeDefined();
  });

  it('should return other start', () => {
    EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);

    expect(
      defaultValue({ data: {}, node: {}, position: 'start' }),
    ).toBeDefined();
  });
});

describe('<Location />', () => {
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

    rendered = shallow(<Location {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Location).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('clearData()', () => {
    it('should clearData()', () => {
      instance.clearData();

      expect(rendered.state().name).toBe('');
      expect(rendered.state().placeId).toBe('');
      expect(rendered.state().address).toBe('');
      expect(rendered.state().number).toBe('');
      expect(rendered.state().website).toBe('');
    });
  });

  describe('handleSelect()', () => {
    it('should handleSelect() place', () => {
      instance.handleSelect({
        suggestion: { name: 'suggestion' },
        place: { name: 'name' },
      });

      expect(rendered.state().name).toBe('suggestion');
    });

    it('should handleSelect() timezone', () => {
      instance.handleSelect({ timezone: { timeZoneId: 'timeZoneId' } });

      expect(rendered.state().timeZoneId).toBe('timeZoneId');
    });
  });

  describe('renderData()', () => {
    it('should renderData isTransportation start', () => {
      rendered.setProps({ position: 'start' });
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderData);
    });

    it('should renderData isTransportation end', () => {
      rendered.setProps({ position: 'end' });
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderData);
    });

    it('should renderData other', () => {
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderData);
    });
  });

  describe('changeName()', () => {
    it('should changeName()', () => {
      instance.changeName('111');

      expect(rendered.state().name).toBe('111');
    });
  });

  describe('render()', () => {
    it('should render showTimeZone', () => {
      rendered.setProps({ showTimeZone: true });
      instance.renderData = jest.fn(() => 'renderData');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
