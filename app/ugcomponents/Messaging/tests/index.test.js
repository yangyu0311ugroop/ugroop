import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Messaging } from '../index';

describe('Messaging component', () => {
  let wrapper;
  let onClose;

  beforeEach(() => {
    onClose = jest.fn();

    wrapper = shallow(<Messaging content="Some Content" onClose={onClose} />);
  });

  it('should render messaging component', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render the icon when present', () => {
    wrapper.setProps({ icon: <img src="/someimg.jpg" alt="Test" /> });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should not render the icon when not present', () => {
    wrapper.setProps({ icon: null });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
