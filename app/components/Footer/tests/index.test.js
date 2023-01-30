/**
 * Testing our Footer component
 */

import React from 'react';
import { shallow } from 'enzyme';
import { FooterTest, styleSheet } from '../index';

const children = <h1>Test</h1>;
const sheet = {
  root: {
    paddingTop: '24px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const renderComponent = (props = {}) =>
  shallow(
    <FooterTest classes={sheet} {...props}>
      {children}
    </FooterTest>,
  );

describe('components/Footer/stylesheet', () => {
  it('still matches snapshot', () => {
    const theme = { colorTone: 'warm' };
    expect(styleSheet(theme)).toMatchSnapshot();
  });

  it('upperBorder.borderTop still matches snapshot if not warm theme', () => {
    const theme = { colorTone: 'notWarm' };
    expect(styleSheet(theme).upperBorder.borderTop).toMatchSnapshot();
  });
});

describe('<Footer />', () => {
  it('should render an <Footer> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('footer');
  });
  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });
  it('should have root classname', () => {
    const renderedComponent = renderComponent();
    expect(
      renderedComponent.find('.paddingTop.marginBottom.display.justifyContent')
        .length,
    ).toBe(1);
  });
});
