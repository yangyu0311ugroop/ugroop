/**
 * Testing our Navi component
 */

import React from 'react';
import { shallow } from 'enzyme';
import Li from 'components/Li/index';
import { FooterItemTest } from '../footerItem';

const children = <h1>Test</h1>;
const styleSheet = {
  root: {
    display: 'inline-block',
    paddingRight: '32px',
    fontSize: '14px',
  },
};

const renderComponent = (props = {}) =>
  shallow(
    <FooterItemTest classes={styleSheet} {...props}>
      {children}
    </FooterItemTest>,
  );

describe('<FooterItem />', () => {
  it('type shall be Li', () => {
    const renderedComponent = renderComponent({ item: children });
    expect(renderedComponent.type()).toEqual(Li);
  });
  it('should have children', () => {
    const renderedComponent = renderComponent({ item: children });
    expect(renderedComponent.contains(children)).toEqual(true);
  });
});
