/**
 * Testing our Navi component
 */

import React from 'react';
import { shallow } from 'enzyme';
import Li from 'components/Li/index';
import { NaviItemTest, styleSheet } from '../naviItem';

const children = <h1>Test</h1>;

const renderComponent = (props = {}) =>
  shallow(
    <NaviItemTest classes={styleSheet({ colorTone: 'warm' })} {...props}>
      {children}
    </NaviItemTest>,
  );

const renderComponentActive = (props = {}) =>
  shallow(
    <NaviItemTest classes={styleSheet({ colorTone: 'warm' })} active {...props}>
      {children}
    </NaviItemTest>,
  );

describe('components/Navbar/stylesheet', () => {
  it('still matches snapshot', () => {
    const theme = { colorTone: 'warm' };
    expect(styleSheet(theme)).toMatchSnapshot();
  });

  it('item still matches snapshot if not warm theme', () => {
    const theme = { colorTone: 'notWarm' };
    expect(styleSheet(theme).item).toMatchSnapshot();
  });
});

describe('<NaviItem />', () => {
  it('type shall be Li', () => {
    const renderedComponent = renderComponent({ item: children });
    expect(renderedComponent.type()).toEqual(Li);
  });
  it('should have children', () => {
    const renderedComponent = renderComponent({ item: children });
    expect(renderedComponent.contains(children)).toEqual(true);
  });
  it('renderComponentActive color shall be white', () => {
    const renderedComponent = renderComponentActive({ item: children });
    expect(renderedComponent.find('.color').length).toBe(1);
  });
});
