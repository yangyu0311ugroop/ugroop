import { URL_HELPERS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LeftSideBar } from '../index';

describe('<LeftSideBar />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const location = {
    pathname: '',
    search: '',
  };

  const props = {
    classes: {},
    resaga,
    organisationId: 2233,
    location,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<LeftSideBar {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(LeftSideBar).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('parseCurrent()', () => {
    it('should parseCurrent', () => {
      rendered.setProps({ location: { search: '?current=2323' } });

      expect(instance.parseCurrent()).toBe(2323);
    });
  });

  describe('renderMemberLinks()', () => {
    it('should renderMemberLinks', () => {
      rendered.setProps({ members: [1] });
      instance.parseCurrent = jest.fn(() => 2323);

      const snapshot = shallow(<div>{instance.renderMemberLinks()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCommonWorkingSpace()', () => {
    it('should render active #1', () => {
      rendered.setProps({ location: { pathname: URL_HELPERS.orgTours(2233) } });
      instance.parseCurrent = jest.fn(() => 0);

      const snapshot = shallow(
        <div>{instance.renderCommonWorkingSpace()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render active #2', () => {
      rendered.setProps({ id: 999 });
      instance.parseCurrent = jest.fn(() => 999);

      const snapshot = shallow(
        <div>{instance.renderCommonWorkingSpace()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render link', () => {
      rendered.setProps({ location: { pathname: 'some path' } });
      instance.parseCurrent = jest.fn(() => 2323);

      const snapshot = shallow(
        <div>{instance.renderCommonWorkingSpace()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderCommonWorkingSpace = jest.fn(
        () => 'renderCommonWorkingSpace',
      );
      instance.renderMemberLinks = jest.fn(() => 'renderMemberLinks');
      instance.hasOrgAccess = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
