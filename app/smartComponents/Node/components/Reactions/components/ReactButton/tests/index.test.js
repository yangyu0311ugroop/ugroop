import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ReactButton } from '../index';

describe('<ReactButton />', () => {
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
    rendered = shallow(<ReactButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ReactButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('stopLoading', () => {
    it('should set loading state to false', () => {
      instance.stopLoading();

      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleClick', () => {
    it('should run dispatchTo node api create link', () => {
      rendered.setProps({
        userId: 1,
      });

      instance.handleClick();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should run dispatch to delete link when user already reacted', () => {
      rendered.setProps({
        userId: 1,
        hasReacted: true,
      });

      instance.handleClick();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
