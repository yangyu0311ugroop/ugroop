/**
 * Testing our link component
 */

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import NaviBar from '../index';
const children = <h1>Test</h1>;
const renderComponent = () => shallow(<NaviBar>{children}</NaviBar>);

describe('<NaviBar />', () => {
  it('still matches snapshot', () => {
    const renderedComponent = renderComponent();
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });
});
