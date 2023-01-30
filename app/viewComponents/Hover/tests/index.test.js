import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Hover } from '../index';

describe('<Hover />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    children: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Hover {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Hover).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleMouseEnter', () => {
    it('should set entered state to true and anchorEl to current target', () => {
      instance.handleMouseEnter({
        currentTarget: 'currentTarget',
      });

      expect(rendered.state().entered).toBe(true);
      expect(rendered.state().anchorEl).toBe('currentTarget');
    });
  });

  describe('handleMouseLeave', () => {
    it('should set entered state to false and anchorEl to null', () => {
      instance.handleMouseLeave();

      expect(rendered.state().entered).toBe(false);
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
