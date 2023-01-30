import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Overview } from '../index';

describe('<Overview />', () => {
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
    rendered = shallow(<Overview {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Overview).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('renderButton()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderButton({ openMenu: jest.fn() })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderMenuItems()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderMenuItems({ closeMenu: jest.fn() })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('onSelectItem()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.onSelectItem(true)()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ renderHeader: jest.fn(() => 'header') });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
