import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGMenuItem } from '../index';

describe('UGMenuItem component', () => {
  it('should render something', () => {
    const wrapper = shallow(<UGMenuItem classes={{}}>Sample</UGMenuItem>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
