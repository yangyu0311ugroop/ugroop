import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { defaultValue, EndTime } from '../index';

describe('defaultValue()', () => {
  it('should return endTimeValue null', () => {
    EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => 'PT11H');
    NODE_HELPERS.withTime = jest.fn(() => false);

    expect(defaultValue({})).toBe(null);
  });

  it('should return endTimeValue', () => {
    EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => 'PT11H');
    NODE_HELPERS.withTime = jest.fn(() => true);

    expect(defaultValue({})).toBeDefined();
  });

  it('should return tempEndTime', () => {
    EVENT_VIEW_HELPERS.tempEndTime = jest.fn(() => 'tempEndTime');

    expect(defaultValue({})).toBeDefined();
  });

  it('should return null', () => {
    EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => '');
    EVENT_VIEW_HELPERS.tempEndTime = jest.fn(() => '');

    expect(defaultValue({})).toBe(null);
  });
});

describe('<EndTime />', () => {
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

    rendered = shallow(<EndTime {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EndTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange()', () => {
    it('should return null', () => {
      EVENT_DATA_HELPERS.checkTimeChange = jest.fn(() => undefined);

      expect(instance.handleChange()).toBe(null);
    });

    it('should handleChange', () => {
      EVENT_DATA_HELPERS.checkTimeChange = jest.fn(() => 1);

      instance.handleChange();

      expect(rendered.state().value).toBe(1);
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('handleClickOption()', () => {
    it('should handleClickOption()', () => {
      instance.handleChange = jest.fn(() => '');

      instance.handleClickOption({})();

      TEST_HELPERS.expectCalled(instance.handleChange);
    });
  });

  describe('currentValue()', () => {
    it('should return null', () => {
      expect(instance.currentValue()).toBe(undefined);
    });

    it('should currentValue', () => {
      expect(instance.currentValue(moment())).toBeDefined();
    });
  });

  describe('renderOption()', () => {
    it('should renderOption', () => {
      instance.currentValue = jest.fn();

      TEST_HELPERS.expectDefined(instance.renderOption, [
        { tempStartTime: '11:00' },
        30,
        '30 mins',
      ]);
    });
  });

  describe('renderMenu()', () => {
    it('should return null', () => {
      expect(instance.renderMenu({})).toBe(null);
    });

    it('should renderMenu', () => {
      instance.renderOption = jest.fn(() => 'renderOption');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [
        {
          tempStartTime: '12',
        },
      ]);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.startTime = jest.fn(() => '');
      instance.renderButton = jest.fn(() => 'renderButton');

      expect(instance.render()).toBe('renderButton');
    });

    it('should render', () => {
      EVENT_VIEW_HELPERS.startTime = jest.fn(() => '11');
      EVENT_VIEW_HELPERS.tempEndDay = jest.fn(() => 'P0D');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
