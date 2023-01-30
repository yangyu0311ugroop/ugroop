import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { BGContentWrapper } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingBGContentWrapper', stylesheet);

describe('BGContentWrapper', () => {
  it('should render what it should render', () => {
    const location = {
      pathname: '/',
    };
    const wrapper = shallow(
      <BGContentWrapper classes={mockStyle} location={location}>
        Sample
      </BGContentWrapper>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('still matches snapshot if location.pathname=/features', () => {
    const location = {
      pathname: '/features',
    };
    const wrapper = shallow(
      <BGContentWrapper classes={mockStyle} location={location}>
        Sample
      </BGContentWrapper>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render when location is unknown', () => {
    const location = {
      pathname: '123123123',
    };
    const wrapper = shallow(
      <BGContentWrapper classes={mockStyle} location={location}>
        Sample
      </BGContentWrapper>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render if location.pathname is not defined', () => {
    const location = {};
    const wrapper = shallow(
      <BGContentWrapper classes={mockStyle} location={location}>
        Sample
      </BGContentWrapper>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
