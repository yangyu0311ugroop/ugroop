import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Header } from '../index';

describe('<Header />', () => {
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
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('show()', () => {
    it('should call setValue', () => {
      instance.show(true)();

      expect(resaga.setValue).toBeCalledWith({ show: true });
    });
  });

  describe('count()', () => {
    it('should return 0', () => {
      expect(instance.count()).toBe(0);
    });
  });

  describe('renderTitle()', () => {
    it('should render completed', () => {
      rendered.setProps({ showCompleted: true });

      const snapshot = shallow(<div>{instance.renderTitle()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('handle close click', () => {
      expect(toJSON(rendered.instance().handleCloseClick())).toMatchSnapshot();
    });

    it('should render pending', () => {
      rendered.setProps({ showCompleted: false });

      const snapshot = shallow(<div>{instance.renderTitle()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderHeaderButtons()', () => {
    it('should renderHeaderButtons', () => {
      const snapshot = shallow(<div>{instance.renderHeaderButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderHeaderButtons if smDown', () => {
      rendered.setProps({ smDown: true });
      const snapshot = shallow(<div>{instance.renderHeaderButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderTitle = jest.fn(() => 'renderTitle');
      instance.renderHeaderButtons = jest.fn(() => 'renderHeaderButtons');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if smDown', () => {
      rendered.setProps({
        smDown: true,
      });
      instance.renderTitle = jest.fn(() => 'renderTitle');
      instance.renderHeaderButtons = jest.fn(() => 'renderHeaderButtons');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
