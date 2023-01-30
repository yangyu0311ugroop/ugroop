import React from 'react';
import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../index';

describe('<Wrapper />', () => {
  it('should render Grid', () => {
    const children = 'Text';
    const renderedComponent = shallow(<Wrapper>{children}</Wrapper>);
    expect(renderedComponent.type()).toEqual(Grid);
  });
  it('should render its children', () => {
    const children = 'Text';
    const renderedComponent = shallow(<Wrapper>{children}</Wrapper>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should pass correct props', () => {
    const children = 'Text';
    const renderedComponent = shallow(<Wrapper xs="12">{children}</Wrapper>);
    expect(renderedComponent.props().item).toBe(true);
    expect(renderedComponent.props().xs).toBe('12');
  });
});
