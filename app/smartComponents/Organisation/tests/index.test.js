import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Organisation } from '../index';

describe('<Organisation />', () => {
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
    rendered = shallow(<Organisation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Organisation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      rendered.setProps({ hiddenSm: false, minimise: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });

    it('should customised renderDefault', () => {
      rendered.setProps({ hiddenSm: true, minimise: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
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
