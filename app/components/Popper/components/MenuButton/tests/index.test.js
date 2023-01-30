import { shallow } from 'enzyme';
import React from 'react';
import { MenuButton } from '../index';

describe('<MenuButton />', () => {
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

    rendered = shallow(<MenuButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MenuButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      expect(instance.render()).toBeDefined();
    });
  });
});
