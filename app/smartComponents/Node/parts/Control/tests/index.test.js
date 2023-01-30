import { EMPTY_RTE } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Control } from '../index';

describe('<Control />', () => {
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

    rendered = shallow(<Control {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Control).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isEmpty()', () => {
    it('should return false', () => {
      expect(instance.isEmpty('test')).toBe(false);
    });
    it('should return true on undefined string', () => {
      expect(instance.isEmpty()).toBe(true);
    });
    it('should return true on emtpy string', () => {
      expect(instance.isEmpty('')).toBe(true);
    });
    it('should return true on EMPTY_RTE', () => {
      expect(instance.isEmpty(EMPTY_RTE)).toBe(true);
    });
  });

  describe('control()', () => {
    it('should render empty', () => {
      instance.isEmpty = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.control);
    });

    it('should control', () => {
      instance.isEmpty = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.control);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.control = jest.fn(() => 'control');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
