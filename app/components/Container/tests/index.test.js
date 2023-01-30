/**
 * Testing our Footer component
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Container } from '../index';

const children = <h1>Test</h1>;

const renderComponent = (props = {}) =>
  shallow(
    <Container classes={{}} {...props}>
      {children}
    </Container>,
  );

describe('<Container />', () => {
  it('should render', () => {
    const renderedComponent = renderComponent({
      xl: true,
      large: true,
      medium: true,
      reading: true,
      paddingLeft: true,
      maxSize: true,
      isPublic: true,
    });
    expect(renderedComponent.contains(children)).toEqual(true);
  });
});
