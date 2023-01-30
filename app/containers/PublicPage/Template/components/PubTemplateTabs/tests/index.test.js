import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PublicTabPage } from '../index';

describe('Pub Template Tab', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PublicTabPage tabId={1} />);
  });
  describe('render', () => {
    it('shall match with snapshot', () => {
      expect(toJSON(component)).toMatchSnapshot();
    });
  });
});
