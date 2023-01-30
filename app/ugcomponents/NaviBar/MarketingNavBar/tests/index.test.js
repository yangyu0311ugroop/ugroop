import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MarketingNavBar } from '../index';

describe('MarketingNavBar', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<MarketingNavBar />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
