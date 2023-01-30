import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { NODE_TIME_MODES } from 'utils/constants/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { StartMode } from '../index';

describe('<StartMode />', () => {
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

    rendered = shallow(<StartMode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(StartMode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('dataMode()', () => {
    it('should dataMode() !node', () => {
      rendered.setProps({ startMode: NODE_TIME_MODES.relativeAtTime });

      expect(instance.dataMode()).toBe(NODE_TIME_MODES.relativeAtTime);
    });

    it('should dataMode() node unanchored', () => {
      rendered.setProps({ node: {}, timelineId: 999 });

      EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => '999');
      EVENT_VIEW_HELPERS.tempStartTime = jest.fn(() => '11');

      expect(instance.dataMode()).toBe(NODE_TIME_MODES.unanchored);
    });

    it('should dataMode() node relative', () => {
      rendered.setProps({ node: {}, timelineId: 333 });

      EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => '999');
      EVENT_VIEW_HELPERS.tempStartTime = jest.fn(() => '');

      expect(instance.dataMode()).toBe(NODE_TIME_MODES.relative);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.dataMode = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
