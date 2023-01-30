import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Itinerary } from '../index';

const props = {
  dayIds: [1, 2, 3],
  days: { 1: { id: 1, content: 'test' } },
  classes: {},
};

describe('Day/Itinerary', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<Itinerary {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
