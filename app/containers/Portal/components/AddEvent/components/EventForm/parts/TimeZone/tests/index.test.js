import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TimeZone } from '../index';

describe('<TimeZone />', () => {
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

    rendered = shallow(<TimeZone {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TimeZone).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('timezone()', () => {
    it('should return default', () => {
      rendered.setProps({ timeZoneOffset: 'aa' });

      expect(instance.timezone()).toBeDefined();
    });

    it('should timezone', () => {
      rendered.setProps({ timeZoneOffset: 1 });

      expect(instance.timezone()).toBeDefined();
    });
  });

  describe('timeZoneOffset()', () => {
    it('should return null', () => {
      rendered.setProps({ timeZoneOffset: 0 });

      expect(instance.timeZoneOffset()).toBe(null);
    });

    it('should timeZoneOffset', () => {
      rendered.setProps({ timeZoneOffset: -99 });

      TEST_HELPERS.expectMatchSnapshot(instance.timeZoneOffset);
    });
  });

  describe('renderEmpty()', () => {
    it('should return null', () => {
      rendered.setProps({ showTimeZone: false });

      expect(instance.renderEmpty()).toBe(null);
    });

    it('should renderEmpty', () => {
      rendered.setProps({ showTimeZone: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ timeZoneName: '' });
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.render()).toBe('renderEmpty');
    });

    it('should render', () => {
      rendered.setProps({ timeZoneName: '123' });
      instance.timezone = jest.fn(() => ({ as: () => 999 }));
      instance.timeZoneOffset = jest.fn(() => 'timeZoneOffset');

      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
