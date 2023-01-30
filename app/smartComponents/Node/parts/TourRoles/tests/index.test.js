import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TourRoles } from '../index';

describe('<TourRoles />', () => {
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

    rendered = shallow(<TourRoles {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourRoles).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('translateRoles()', () => {
    it('should translateRoles()', () => {
      expect(
        instance.translateRoles(['tour_owner', 'tour_viewer']),
      ).toMatchSnapshot();
    });
  });

  describe('formatRoles()', () => {
    it('should return 1', () => {
      instance.translateRoles = jest.fn(() => ['tour_owner']);

      expect(instance.formatRoles()).toMatchSnapshot();
    });

    it('should return 2', () => {
      instance.translateRoles = jest.fn(() => [
        'tour_owner',
        'tour_interested',
      ]);

      expect(instance.formatRoles()).toMatchSnapshot();
    });

    it('should return 3', () => {
      instance.translateRoles = jest.fn(() => [
        'tour_owner',
        'tour_interested',
        'tour_participant',
      ]);

      expect(instance.formatRoles()).toMatchSnapshot();
    });
  });

  describe('renderRoles()', () => {
    it('should renderRoles', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoles);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ tourRoles: [] });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      instance.renderRoles = jest.fn(() => 'renderRoles');

      rendered.setProps({ tourRoles: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
