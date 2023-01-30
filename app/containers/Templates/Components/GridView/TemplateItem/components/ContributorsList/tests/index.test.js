import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ContributorsList } from '../index';

describe('<ContributorsList />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    dataStore: 'sampleDataStore',
  };

  beforeEach(() => {
    rendered = shallow(<ContributorsList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ContributorsList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should only render empty div if persons is not array', () => {
    rendered.setProps({
      persons: null,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('renderAvatarList', () => {
    it('should render div if persons prop is empty', () => {
      const snapshot = shallow(<div>{instance.renderAvatarList()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render avatarById with only the first name if item is just 1', () => {
      rendered.setProps({
        persons: ['e@g.com'],
      });
      const snapshot = shallow(<div>{instance.renderAvatarList()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render avatarById if items are less than 3', () => {
      rendered.setProps({
        persons: ['e@g.com', 'f@g.com'],
      });
      const snapshot = shallow(<div>{instance.renderAvatarList()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render blank span if greater than 3 (since we will be hiding the other contributors)', () => {
      rendered.setProps({
        persons: ['e@g.com', 'f@g.com', 'h@g.com', 'j@g.com', 'l@g.com'],
      });
      const snapshot = shallow(<div>{instance.renderAvatarList()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    beforeEach(() => {
      instance.renderAvatarMore = jest.fn(() => <div />);
      instance.renderAvatarList = jest.fn(() => <div />);
      instance.renderAvatarText = jest.fn(() => <div />);
    });
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
