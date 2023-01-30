import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Star, toggleStar } from '../index';

describe('toggleStar()', () => {
  it('should star', () => {
    expect(toggleStar(1123)()).toEqual([1123]);
  });

  it('should unstar', () => {
    expect(toggleStar(1123)([1, 1123])).toEqual([1]);
  });
});

describe('<Star />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 1122,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Star {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Star).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('toggleStar()', () => {
    it('should toggleStar()', () => {
      instance.toggleStar({ stopPropagation: jest.fn() });

      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render children', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      expect(instance.render()).toBe('children');
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
