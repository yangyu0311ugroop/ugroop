import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Content } from '../index';

const props = {
  dayId: 1,
  index: 1,
  content: 'abc',
  location: 'abv',
  classes: {},
  dayCount: 1,
  endId: 0,
};

describe('Itinerary/Content', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<Content {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot', () => {
      component.setProps({
        content: '',
        location: '',
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('Should render correctly when 1 day tour', () => {
      component.setProps({
        dayCount: 2,
        index: 2,
        endId: 1,
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('Should render correctly when more than 1 day tour', () => {
      component.setProps({
        dayCount: 3,
        index: 2,
        endId: 1,
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot if no location', () => {
      component.setProps({
        location: '',
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
