import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Logo } from '../index';

describe('<Logo />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Logo classes={{}} />);
  });
  it('should exists', () => {
    expect(Logo).toBeDefined();
  });
  it('should render without exploding', () => {
    expect(component.length).toBe(1);
  });
  it('should render image correctly', () => {
    const img = component.find('img');
    expect(img).toBeDefined();
    expect(img.props().src).toBeDefined();
  });
  it('still matches snapshot if props.tinting', () => {
    component.setProps({ tinting: true });
    expect(toJSON(component)).toMatchSnapshot();
  });
});
