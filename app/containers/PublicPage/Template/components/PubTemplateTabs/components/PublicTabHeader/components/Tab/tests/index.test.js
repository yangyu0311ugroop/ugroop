import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PublicTabContainer } from '../index';

describe('PublicTabContainer', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(
      <PublicTabContainer
        tabId={5}
        label="What is it for a man to gain the whole world but loses his soul"
        resaga={{}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should return div if isPrivate', () => {
    const wrapper = shallow(
      <PublicTabContainer tabId={6} resaga={{}} isPrivate />,
    );
    expect(wrapper.html()).toEqual('<div></div>');
  });
});
