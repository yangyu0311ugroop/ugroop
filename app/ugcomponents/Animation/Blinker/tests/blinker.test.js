/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import Blinker from '../index';

const text = 'Hello';
const renderedComponent = shallow(<Blinker>{text}</Blinker>);

describe('<Blinker />', () => {
  it('should exists', () => {
    expect(Blinker);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render children', () => {
    expect(renderedComponent.html()).toMatch(text);
  });
});

describe('<Blinker /> props', () => {
  it('should be initiated correctly - 1', () => {
    const props = renderedComponent.props();
    expect(props.blink).toBe(false);
  });
  it('should be initiated correctly - 2', () => {
    const rendered = shallow(<Blinker blink>Hi</Blinker>);
    const props = rendered.props();
    expect(props.blink).toBe(true);
  });
});
