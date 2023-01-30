import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Hazards } from '../index';

describe('<Hazards />', () => {
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

    rendered = shallow(<Hazards {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Hazards).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderHazard()', () => {
    it('should renderHazard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHazard, [1, 22]);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('render()', () => {
    it('should renderEmpty', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');
      rendered.setProps({ ids: [] });

      expect(instance.render()).toBe('renderEmpty');
    });

    it('should render', () => {
      instance.renderHazard = jest.fn(() => 'renderHazard');
      rendered.setProps({ ids: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
