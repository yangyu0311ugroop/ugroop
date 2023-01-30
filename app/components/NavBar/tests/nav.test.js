/**
 * Testing our Navi component
 */

import React from 'react';
import { shallow } from 'enzyme';
import { NavTest, styleSheet } from '../nav';

const children = <h1>Test</h1>;
const style = {
  navi: {
    padding: [16, 0],
    background: '#1F273D',
  },
};

const renderComponent = (props = {}) =>
  shallow(
    <NavTest classes={style} {...props}>
      {children}
    </NavTest>,
  );

describe('<Navi />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('div');
  });
  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });
  it('should have background classname', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('.background').length).toBe(1);
  });
  it('style', () => {
    expect(styleSheet).toBeDefined();
    expect(typeof styleSheet({})).toBe('object');
    expect(typeof styleSheet({ colorTone: 'warm' })).toBe('object');
  });
});
