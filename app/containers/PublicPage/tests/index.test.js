import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PublicPageIndex from '../index';

describe('Public Page Index', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PublicPageIndex match={{ url: 'something' }} />);
  });
  it('Route Render Test', () => {
    expect(toJSON(component)).toMatchSnapshot();
  });
});
