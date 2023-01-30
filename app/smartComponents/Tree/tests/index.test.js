import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Tree } from '../index';

describe('<Tree />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Tree {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Tree).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('initializeArr', () => {
    it('should call setValue with particular param', () => {
      rendered.setProps({
        parentId: 1,
      });
      rendered.setProps({
        id: 1,
      });
      instance.initializeArr();
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('arrSetter', () => {
    it('should set pair value as it is if arr value is undefined', () => {
      const result = instance.arrSetter([[1, 2]])();
      expect(result).toEqual([[1, 2]]);
    });

    it('should append value passed to it if arr is existing', () => {
      const result = instance.arrSetter([[1, 2]])([[3, 2]]);
      expect(result).toEqual([[3, 2], [1, 2]]);
    });
  });

  describe('stripOwnProps', () => {
    it('should only return props that are not of the component', () => {
      rendered.setProps({
        id: 1,
      });
      rendered.setProps({
        childIds: [{ id: 1 }, { id: 2 }],
      });
      rendered.setProps({
        otherProp: 1,
      });

      const result = instance.stripOwnProps();
      expect(result).toEqual({
        otherProp: 1,
        viewPath: 'tree',
        viewStore: '',
        selectors: [],
      });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
