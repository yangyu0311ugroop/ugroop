import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { ListItemSubtitle } from '../index';

describe('<ListItemSubtitle />', () => {
  let rendered;
  let instance;
  let classes;

  beforeEach(() => {
    classes = {};
    rendered = shallow(<ListItemSubtitle classes={classes} />);
    instance = rendered.instance();
  });

  describe('renderFullName', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderFullName({ id: 1 })}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDurationText', () => {
    it('should return empty string if there is no duration', () => {
      rendered.setProps({
        duration: false,
      });
      expect(instance.renderDurationText()).toEqual('');
    });
    it('should match snapshot if there is duration', () => {
      rendered.setProps({
        duration: 'duration',
      });
      const snapshot = shallow(<div>{instance.renderDurationText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should match snapshot if type is createdBy', () => {
      rendered.setProps({
        type: 'createdBy',
        createdBy: 'Elai',
      });
      instance.renderFullName = jest.fn(() => 'renderFullName');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if type is lastModifiedBy', () => {
      rendered.setProps({
        type: 'lastModifiedBy',
        lastModifiedBy: 'Elai',
      });
      instance.renderFullName = jest.fn(() => 'renderFullName');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
