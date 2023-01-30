import Img from 'components/Img/index';
/**
 * Created by Yang on 22/2/17.
 */
import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Logo } from '../Logo';

const styleSheet = {
  pageLogo: '',
};

const wrapper = mount(<Logo classes={styleSheet} />);

describe('<PageLogo />', () => {
  afterAll(() => {
    if (global.gc) {
      global.gc();
    }
  });
  it('should render something', () => {
    expect(wrapper.render()).toBeDefined();
  });

  it('should have children Img', () => {
    expect(wrapper.find(Img)).toHaveLength(1);
  });

  it('still matches snapshot if props.block', () => {
    wrapper.setProps({ block: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
