import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { ContributorList } from '../index';

describe('<ContributorList />', () => {
  let rendered;
  let instance;

  const props = {
    dataStore: 'nodestore',
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<ContributorList {...props} />);
    instance = rendered.instance();
  });

  describe('renderAvatarText', () => {
    it('should match snapshot if persons is equal to 1', () => {
      rendered.setProps({
        persons: [1],
      });
      const snapshot = shallow(<div>{instance.renderAvatarText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if persons is greater than 2', () => {
      rendered.setProps({
        persons: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderAvatarText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if persons is equal to 2', () => {
      rendered.setProps({
        persons: [1, 2],
      });
      const snapshot = shallow(<div>{instance.renderAvatarText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if persons is less than 1', () => {
      rendered.setProps({
        persons: [],
      });
      const snapshot = shallow(<div>{instance.renderAvatarText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('mapPersons', () => {
    it('should match snapshot if index is greater than 2', () => {
      const snapshot = shallow(<div>{instance.mapPersons('person', 3)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if index is less than 2', () => {
      const snapshot = shallow(<div>{instance.mapPersons('person', 1)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should match snapshot if persons is not array', () => {
      rendered.setProps({
        persons: null,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAvatarMore', () => {
    it('should match snapshot if persons > 3', () => {
      rendered.setProps({
        persons: [1, 2, 3, 4],
      });
      const snapshot = shallow(<div>{instance.renderAvatarMore()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if persons < 3', () => {
      rendered.setProps({
        persons: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderAvatarMore()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
