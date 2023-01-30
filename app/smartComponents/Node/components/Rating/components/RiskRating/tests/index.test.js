import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RiskRating } from '../index';

describe('<RiskRating />', () => {
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

    rendered = shallow(<RiskRating {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RiskRating).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('rating()', () => {
    it('should return 0', () => {
      rendered.setProps({ impact: 0, likelihood: 0 });

      expect(instance.rating()).toBe(0);
    });

    it('should return 0 - 1', () => {
      rendered.setProps({ impact: 1, likelihood: 1 });

      expect(instance.rating()).toBe(0);
    });

    it('should return 1', () => {
      rendered.setProps({ impact: 1, likelihood: 2 });

      expect(instance.rating()).toBe(1);
    });

    it('should return 0 - 2', () => {
      rendered.setProps({ impact: 2, likelihood: 0 });

      expect(instance.rating()).toBe(0);
    });

    it('should return 1 - 1', () => {
      rendered.setProps({ impact: 2, likelihood: 2 });

      expect(instance.rating()).toBe(1);
    });

    it('should return 2 - 1', () => {
      rendered.setProps({ impact: 2, likelihood: 3 });

      expect(instance.rating()).toBe(2);
    });

    it('should return 1 - 2', () => {
      rendered.setProps({ impact: 3, likelihood: 1 });

      expect(instance.rating()).toBe(1);
    });

    it('should return 2 - 2', () => {
      rendered.setProps({ impact: 3, likelihood: 2 });

      expect(instance.rating()).toBe(2);
    });

    it('should return 3 - 1', () => {
      rendered.setProps({ impact: 3, likelihood: 3 });

      expect(instance.rating()).toBe(3);
    });

    it('should return 1 - 3', () => {
      rendered.setProps({ impact: 4, likelihood: 0 });

      expect(instance.rating()).toBe(1);
    });

    it('should return 2 - 3', () => {
      rendered.setProps({ impact: 4, likelihood: 1 });

      expect(instance.rating()).toBe(2);
    });

    it('should return 3 - 2', () => {
      rendered.setProps({ impact: 4, likelihood: 2 });

      expect(instance.rating()).toBe(3);
    });

    it('should return 3 - 3', () => {
      rendered.setProps({ impact: 5, likelihood: 2 });

      expect(instance.rating()).toBe(3);
    });
  });

  describe('renderHelp()', () => {
    it('should renderHelp', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHelp);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.renderHelp = jest.fn(() => 'renderHelp');
      rendered.setProps({ help: true });

      expect(instance.render()).toBe('renderHelp');
    });

    it('should render', () => {
      rendered.setProps({ help: false });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
