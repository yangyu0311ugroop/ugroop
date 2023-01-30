import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGLandingLayout } from '../index';

describe('LandingLayout', () => {
  it('should render what it should render', () => {
    const locationProp = {
      location: {
        pathname: '/',
      },
    };
    const wrapper = shallow(<UGLandingLayout location={locationProp} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
