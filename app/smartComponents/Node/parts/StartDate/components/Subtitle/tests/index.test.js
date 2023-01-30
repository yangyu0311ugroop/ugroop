import { ACTIVE, PAST, UPCOMING } from 'appConstants';
import { shallow } from 'enzyme';
import momentjs from 'moment';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Subtitle } from '../index';

describe('<Subtitle />', () => {
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

    rendered = shallow(<Subtitle {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Subtitle).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('startOf()', () => {
    it('should startOf()', () => {
      const date = '2018-05-05T16:23:45.6789Z';

      expect(instance.startOf(date)).toBeDefined();
    });
  });

  describe('endOf()', () => {
    it('should endOf()', () => {
      const date = '2018-05-05T16:23:45.6789Z';

      expect(instance.endOf(date)).toBeDefined();
    });
  });

  describe('status()', () => {
    it('should status() PAST', () => {
      const startDate = '2018-05-05T16:23:45.6789Z';
      rendered.setProps({ startDate, duration: 10 });

      expect(instance.status()).toBeDefined();
    });

    it('should status() PAST', () => {
      const startDate = '2018-05-05T16:23:45.6789Z';
      const now = momentjs('2020-03-06T16:23:45.6789Z');

      rendered.setProps({ startDate, duration: 10 });

      expect(instance.status(now)).toBe(PAST);
    });

    it('should status() ACTIVE', () => {
      const startDate = '2020-03-06T16:23:45.6789Z';
      const now = momentjs('2020-03-06T16:23:45.6789Z');

      rendered.setProps({ startDate, duration: 10 });

      expect(instance.status(now)).toBe(ACTIVE);
    });

    it('should status() ACTIVE 2', () => {
      const startDate = '2020-03-06T16:23:45.6789Z';
      const now = momentjs('2020-03-06T16:23:45.6789Z');

      rendered.setProps({ startDate, duration: 10 });

      expect(instance.status(now)).toBe(ACTIVE);
    });

    it('should status() UPCOMING', () => {
      const startDate = '2020-03-06T07:24:45.6789Z';
      const now = momentjs('2020-03-05T03:59:59.6789Z');

      rendered.setProps({ startDate, duration: 10 });

      expect(instance.status(now)).toBe(UPCOMING);
    });
  });

  describe('renderIcon()', () => {
    it('should return PAST', () => {
      expect(instance.renderIcon(PAST)).toBeDefined();
    });

    it('should return ACTIVE', () => {
      expect(instance.renderIcon(ACTIVE)).toBeDefined();
    });

    it('should return UPCOMING', () => {
      expect(instance.renderIcon(UPCOMING)).toBeDefined();
    });
  });

  describe('renderPast()', () => {
    it('should renderPast()', () => {
      LOGIC_HELPERS.switchCase = jest.fn();

      instance.renderPast({});

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.switchCase);
    });
  });

  describe('renderActive()', () => {
    it('should renderActive()', () => {
      LOGIC_HELPERS.switchCase = jest.fn();

      instance.renderActive({});

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.switchCase);
    });
  });

  describe('renderUpcoming()', () => {
    it('should renderUpcoming()', () => {
      const startDate = momentjs('2020-03-06T16:24:45.6789Z');
      const startOfToday = momentjs('2020-03-06T16:24:45.6789Z');
      LOGIC_HELPERS.switchCase = jest.fn();

      instance.renderUpcoming({ startDate, startOfToday });

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.switchCase);
    });
  });

  describe('renderText()', () => {
    it('should renderText() PAST', () => {
      const startDate = '2020-03-06T16:24:45.6789Z';
      rendered.setProps({ startDate, duration: 10 });
      instance.renderPast = jest.fn(() => 'renderPast');

      expect(instance.renderText(PAST)).toBe('renderPast');
    });
    it('should renderText() ACTIVE', () => {
      const startDate = '2020-03-06T16:24:45.6789Z';
      rendered.setProps({ startDate, duration: 10 });
      instance.renderActive = jest.fn(() => 'renderActive');

      expect(instance.renderText(ACTIVE)).toBe('renderActive');
    });
    it('should renderText() UPCOMING', () => {
      const startDate = '2020-03-06T16:24:45.6789Z';
      rendered.setProps({ startDate, duration: 10 });
      instance.renderUpcoming = jest.fn(() => 'renderUpcoming');

      expect(instance.renderText(UPCOMING)).toBe('renderUpcoming');
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ startDate: '', displayDate: 'weekDay' });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      instance.status = jest.fn(() => 'status');
      instance.renderIcon = jest.fn(() => 'renderIcon');
      instance.renderText = jest.fn(() => 'renderText');

      rendered.setProps({
        startDate: '2020-03-06T16:24:45.6789Z',
        displayDate: 'startDate',
      });

      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
