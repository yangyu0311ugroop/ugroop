import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PhoneCard } from '../index';

describe('<PhoneCard />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<PhoneCard {...props} />);
  });

  it('should exists', () => {
    expect(PhoneCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something if isForm prop is true', () => {
    rendered.setProps({
      isForm: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
