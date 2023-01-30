import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Ul from 'components/Ul';
import { FooterListsTest } from '../index';
import FooterItem from '../footerItem';

const styleSheet = {
  root: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};

const renderedComponent = shallow(
  <FooterListsTest
    classes={styleSheet}
    component={FooterItem}
    items={['test']}
  />,
);

describe('<FooterLists />', () => {
  it('should render an <ul> tag', () => {
    expect(renderedComponent.type()).toEqual(Ul);
  });
  it('should have a className attribute', () => {
    expect(renderedComponent.prop('className')).toBeDefined();
  });
  it('should not adopt an invalid attribute', () => {
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
  it('should render what it should render', () => {
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});
