/**
 * Testing our Navi component
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavWrapper from '../naviWrapper';

const children = <h1>Test</h1>;

const renderComponent = (props = {}) =>
  shallow(<NavWrapper {...props}>{children}</NavWrapper>);

describe('<NavWrapper />', () => {
  it('stoill matches snapshot', () => {
    const renderedComponent = renderComponent();
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});
