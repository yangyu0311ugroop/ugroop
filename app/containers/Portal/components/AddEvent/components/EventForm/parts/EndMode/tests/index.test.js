import { shallow } from 'enzyme';
import React from 'react';
import { NODE_TIME_MODES } from 'utils/constants/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EndMode } from '../index';

describe('<EndMode />', () => {
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

    rendered = shallow(<EndMode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EndMode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('dataMode()', () => {
    it('should dataMode() !node', () => {
      rendered.setProps({ endMode: NODE_TIME_MODES.relativeAtTime });

      expect(instance.dataMode()).toBe(NODE_TIME_MODES.relativeAtTime);
    });

    it('should dataMode() node', () => {
      rendered.setProps({ node: {} });

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
