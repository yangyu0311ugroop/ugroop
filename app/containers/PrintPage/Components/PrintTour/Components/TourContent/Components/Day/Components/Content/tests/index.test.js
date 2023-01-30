import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Content } from '../index';

const props = {
  dayId: 1,
  index: 1,
  photoId: -1,
  description: 'abc',
  content: 'abc',
  photoUrl: 'abc',
  x: -1,
  y: -1,
  width: -1,
  height: -1,
  photo: {},
  loading: true,
  rotate: 0,
  classes: {},
};

describe('Day/Content', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<Content {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(component)).toMatchSnapshot();
    });
    it('Should render correctly when content is empty', () => {
      component.setProps({
        content: '',
        dayPhotoId: 1,
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
