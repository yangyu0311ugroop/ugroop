import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
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
    roleMember: {
      pending: [],
    },
    renderSeatsLeft: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(Header).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('Should match snapshot', () => {
      instance = rendered.instance();
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('onSearchTextChange', () => {
    it('should set the searchText state based on the value given', () => {
      instance = rendered.instance();
      instance.onSearchTextChange({ target: { value: 'qqq' } });
      expect(rendered.state().searchText).toBe('qqq');
    });
  });
  describe('onPressEnter', () => {
    it('on onPressEnter should call alert', () => {
      instance = rendered.instance();
      global.alert = jest.fn();
      instance.onPressEnter();
      expect(global.alert.toBeCalled);
    });
  });
  describe('onClickInviteUser', () => {
    it('on onPressEnter should call alert', () => {
      instance = rendered.instance();
      global.alert = jest.fn();
      instance.onClickInviteUser();
      expect(global.alert.toBeCalled);
    });
  });
});
