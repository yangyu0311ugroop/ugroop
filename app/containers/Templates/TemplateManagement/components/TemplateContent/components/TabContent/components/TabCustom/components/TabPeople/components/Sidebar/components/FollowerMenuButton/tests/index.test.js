import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { FollowerMenuButton } from '../index';

describe('<FollowerMenuButton />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    isMobile: true,
  };

  beforeEach(() => {
    rendered = shallow(<FollowerMenuButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FollowerMenuButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should call setValue', () => {
      instance.handleClick();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('renderContent()', () => {
    it('should render correctly and return null', () => {
      const snapshot = shallow(<div>{instance.renderContent('', false)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderContent('hello', true)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
