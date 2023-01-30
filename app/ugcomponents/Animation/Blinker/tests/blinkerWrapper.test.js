/**
 * Created by quando on 7/4/17.
 */
/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { BlinkerWrapper } from '../index';

const text = 'Hello';
const renderedComponent = shallow(<BlinkerWrapper>{text}</BlinkerWrapper>);
const renderedBlink = shallow(<BlinkerWrapper blink>{text}</BlinkerWrapper>);

describe('<BlinkerWrapper />', () => {
  it('should exists', () => {
    expect(BlinkerWrapper);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
    expect(renderedBlink.length).toBe(1);
  });
  it('should render children', () => {
    expect(renderedComponent.html()).toMatch(text);
    expect(renderedBlink.html()).toMatch(text);
  });
});
