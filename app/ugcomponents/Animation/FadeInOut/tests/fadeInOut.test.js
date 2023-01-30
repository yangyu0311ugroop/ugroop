/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { SIZE } from 'ugcomponents/Animation/constants';
import FadeInOut, { Fade } from '../index';

const text = 'Hello';
const renderedComponent = shallow(<FadeInOut>{text}</FadeInOut>);
const renderedXS = shallow(<FadeInOut size={SIZE.XS}>{text}</FadeInOut>);

describe('<FadeInOut />', () => {
  it('should exists', () => {
    expect(FadeInOut);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
    expect(renderedXS.length).toBe(1);
  });
  it('should render children', () => {
    expect(renderedComponent.html()).toMatch(text);
    expect(renderedXS.html()).toMatch(text);
  });
});

describe('<FadeInOut /> props', () => {
  const iconValid = 'valid';
  const iconInvalid = 'invalid';
  const colorValid = 'green';
  const colorInvalid = 'red';
  it('should be initiated correctly - 1', () => {
    const props = renderedComponent.props();
    expect(props.isValid).toBe(false);
    expect(props.style.color).toBe('#8e94a2');
  });
  it('should be initiated correctly - 2', () => {
    const rendered = shallow(
      <FadeInOut
        isValid
        iconValid={iconValid}
        iconInvalid={iconInvalid}
        colorValid={colorValid}
        colorInvalid={colorInvalid}
      >
        Hi
      </FadeInOut>,
    );
    const props = rendered.props();
    expect(props.isValid).toBe(true);
    expect(props.style.color).toBe(colorValid);
  });
  it('should be initiated correctly - 3', () => {
    const rendered = shallow(
      <FadeInOut
        isValid={false}
        iconValid={iconValid}
        iconInvalid={iconInvalid}
        colorValid={colorValid}
        colorInvalid={colorInvalid}
      >
        Hi
      </FadeInOut>,
    );
    const props = rendered.props();
    expect(props.isValid).toBe(false);
    expect(props.style.color).toBe(colorInvalid);
  });
});

describe('<Fade />', () => {
  it('should be initiated without a problem - isValid', () => {
    shallow(<Fade isValid>Hi</Fade>);
  });
  it('should be initiated without a problem - isValid=false', () => {
    shallow(<Fade isValid={false}>Hi</Fade>);
  });
});
