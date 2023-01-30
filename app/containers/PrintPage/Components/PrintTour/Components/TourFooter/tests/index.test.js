import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TourFooter } from '../index';

const props = {
  classes: {},
  tabIds: [1, 2, 3],
};

describe('TourFooter', () => {
  let component;
  let instance;
  const customTabIds = [1, 2, 3];
  beforeEach(() => {
    component = shallow(<TourFooter customTabIds={customTabIds} {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
  describe('renderFooter', () => {
    it('should be called', () => {
      component.setProps({
        customTabIds: [1, 2],
      });
      instance.renderFooter();
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('should return an empty string if there are no ids', () => {
      component.setProps({
        customTabIds: [],
      });
      instance.renderFooter();
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
