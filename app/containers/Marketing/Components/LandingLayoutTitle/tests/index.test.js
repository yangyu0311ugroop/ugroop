import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { LandingLayoutTitle } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet(
  'MarketingLandingLayoutTitle',
  stylesheet,
  theme,
);

describe('LandingLayoutTitle', () => {
  it('should render what it should render', () => {
    const location = {
      pathname: '/',
    };
    const wrapper = shallow(
      <LandingLayoutTitle classes={mockStyle} location={location} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render if pathname is not defined', () => {
    const location = {
      pathname: '123123',
    };
    const wrapper = shallow(
      <LandingLayoutTitle classes={mockStyle} location={location} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render if pathname is /feautres', () => {
    const location = {
      pathname: '/features',
    };
    const wrapper = shallow(
      <LandingLayoutTitle classes={mockStyle} location={location} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render if pathname is /faq', () => {
    const location = {
      pathname: '/faq',
    };
    const wrapper = shallow(
      <LandingLayoutTitle classes={mockStyle} location={location} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
