import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Children } from '../index';

describe('<Children />', () => {
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

    rendered = shallow(<Children {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Children).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should return null', () => {
      expect(instance.render()).toBe(null);
    });

    it('should children', () => {
      rendered.setProps({ children: jest.fn() });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
