import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { defaultValue, StartTime } from '../index';

describe('defaultValue()', () => {
  it('should return startTimeValue !withTime', () => {
    EVENT_VIEW_HELPERS.startTimeValue = jest.fn(() => 'PT11H');
    NODE_HELPERS.withTime = jest.fn(() => false);

    expect(defaultValue({})).toBe(null);
  });

  it('should return startTimeValue withTime', () => {
    EVENT_VIEW_HELPERS.startTimeValue = jest.fn(() => 'PT11H');
    NODE_HELPERS.withTime = jest.fn(() => true);

    expect(defaultValue({})).toBeDefined();
  });

  it('should return tempStartTime', () => {
    EVENT_VIEW_HELPERS.startTimeValue = jest.fn(() => '');
    EVENT_VIEW_HELPERS.tempStartTime = jest.fn(() => 'tempStartTime');
    moment.utc = jest.fn(() => 'moment.utc');

    expect(defaultValue({})).toBe('moment.utc');
  });

  it('should return null', () => {
    EVENT_VIEW_HELPERS.tempStartTime = jest.fn(() => '');
    moment.utc = jest.fn(() => 'moment.utc');

    expect(defaultValue({})).toBe(null);
  });
});

describe('<StartTime />', () => {
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

    rendered = shallow(<StartTime {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(StartTime).toBeDefined();
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

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
