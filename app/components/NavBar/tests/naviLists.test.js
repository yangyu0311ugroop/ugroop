/**
 * Testing our Navi component
 */

import React from 'react';
import { shallow } from 'enzyme';
import Ul from 'components/Ul/index';
import { NaviListTest, styleSheet } from '../naviLists';
import { NaviItemTest } from '../naviItem';

const children = [<h1>Test</h1>];

const renderComponent = (props = {}) =>
  shallow(
    <NaviListTest classes={styleSheet} {...props} component={NaviItemTest} />,
  );

describe('<NaviList />', () => {
  it('type shall be Ul', () => {
    const renderedComponent = renderComponent({ items: children });
    expect(renderedComponent.type()).toEqual(Ul);
  });
  it('should have children', () => {
    const renderedComponent = renderComponent({ items: children });
    expect(renderedComponent.props().items).toBe(children);
  });
});
