import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ActivityForm } from '../index';

describe('<ActivityForm />', () => {
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

    rendered = shallow(<ActivityForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ActivityForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderEndDateTime()', () => {
    it('should return null', () => {
      EVENT_HELPERS.isEventCustomDate = jest.fn(() => true);

      expect(instance.renderEndDateTime()).toBe(null);
    });

    it('should renderEndDateTime', () => {
      EVENT_HELPERS.isEventCustomDate = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEndDateTime);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderEndDateTime = jest.fn(() => 'renderEndDateTime');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
