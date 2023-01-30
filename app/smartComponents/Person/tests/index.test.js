import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Person } from '../index';

describe('<Person />', () => {
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
    rendered = shallow(<Person {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Person).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      rendered.setProps({ hiddenSm: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });

    it('should hiddenSm renderDefault', () => {
      rendered.setProps({ hiddenSm: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('renderPersonType()', () => {
    it('should renderPersonType', () => {
      rendered.setProps({ hiddenSm: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonType);
    });

    it('should hiddenSm renderPersonType', () => {
      rendered.setProps({ hiddenSm: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonType);
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
    });
  });
});
