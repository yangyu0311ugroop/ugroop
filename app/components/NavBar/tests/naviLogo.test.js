import Img from 'components/Img/index';
/**
 * Created by Yang on 22/2/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import UGLink from 'components/Link';
import { NavLogoTest, styleSheet } from '../naviLogo';
const href = 'http://mxstbr.com/';
const renderComponent = () =>
  shallow(<NavLogoTest classes={styleSheet} link={href} />);

describe('<PageLogo />', () => {
  afterAll(() => {
    if (global.gc) {
      global.gc();
    }
  });
  it('should render an <div> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have children A', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(UGLink)).toHaveLength(1);
  });

  it('should have a correct link props value', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(UGLink).prop('to')).toEqual(href);
  });

  it('should have children Img', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(Img)).toHaveLength(1);
  });
});
