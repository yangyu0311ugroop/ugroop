import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PrintPageIndex from '../index';

describe('Tour Print Page Index', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PrintPageIndex match={{ url: 'something' }} />);
  });
  it('Route Render Test', () => {
    expect(toJSON(component)).toMatchSnapshot();
  });
});
