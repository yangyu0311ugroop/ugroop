import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LegInfo } from 'smartComponents/Node/components/Marker/components/LegInfo/index';

describe('<LegInfo />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    location: 'Melbourne',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<LegInfo {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(LegInfo).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderNoLocation()', () => {
    it('should return null', () => {
      rendered.setProps({ index: -1 });

      expect(instance.renderNoLocation()).toBe(null);
    });

    it('should renderNoLocation', () => {
      rendered.setProps({ index: 22, prevNodeId: 11, nextNodeId: 33 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderNoLocation);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({
        prevId: 11,
        prevDistance: 3322,
        nextId: 22,
        distance: 23232,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderNoLocation', () => {
      instance.renderNoLocation = jest.fn();

      rendered.setProps({ location: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
