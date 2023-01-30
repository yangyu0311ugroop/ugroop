import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MapCard } from '../index';

describe('<MapCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    event: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<MapCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MapCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      EVENT_VIEW_HELPERS.placeId = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('render()', () => {
    it('should return isFlight', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should return isTransportation', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should return default', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
