import React from 'react';
import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import SideBar from '../index';

describe('<SideBar />', () => {
  it('should render Grid', () => {
    const children = 'Text';
    const renderedComponent = shallow(<SideBar>{children}</SideBar>);
    expect(renderedComponent.type()).toEqual(Grid);
  });
  it('should render its children', () => {
    const children = 'Text';
    const renderedComponent = shallow(<SideBar>{children}</SideBar>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should pass correct props', () => {
    const children = 'Text';
    const renderedComponent = shallow(<SideBar xs="12">{children}</SideBar>);
    expect(renderedComponent.props().item).toBe(true);
    expect(renderedComponent.props().xs).toBe('12');
  });
});
