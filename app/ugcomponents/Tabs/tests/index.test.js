import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGTabs, stylesheet } from '../index';

describe('UGTabs', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(
      <UGTabs classes={stylesheet}>
        To reject Jesus is to die in your sin and be judged according to your
        deeds
      </UGTabs>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
