import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DO_NOTHING } from 'appConstants';
import { Checklists } from '../index';

describe('<Checklists />', () => {
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
    rendered = shallow(<Checklists {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checklists).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('onFetchChecklistError', () => {
    it('should render correctly', () => {
      instance.onFetchChecklistError();
      expect(rendered.state().error).toBe(true);
    });
  });
  describe('onFetchSuccess', () => {
    it('should return false', () => {
      instance.onFetchSuccess();
      expect(rendered.state().isLoading).toBe(false);
    });
  });
  describe('renderHeader', () => {
    it('hould render correctly', () => {
      rendered.setProps({ parentChecklists: [1] });
      const snapshot = shallow(<div>{instance.renderHeader()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('sideBar', () => {
    it('hould render correctly', () => {
      rendered.setProps({ parentChecklists: [1] });
      const snapshot = shallow(<div>{instance.sideBar()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderOverViewHeader()', () => {
    it('should render correctly', () => {
      rendered.setProps({ parentChecklists: [] });
      const snapshot = shallow(<div>{instance.renderOverViewHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ parentChecklists: [1] });
      const snapshot = shallow(<div>{instance.renderOverViewHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('iconToggle', () => {
    it('should return false', () => {
      expect(instance.iconToggle()).toEqual(DO_NOTHING);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ parentChecklists: [1] });
      rendered.setState({ isLoading: false });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
