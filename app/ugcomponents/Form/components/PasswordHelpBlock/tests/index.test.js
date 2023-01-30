/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { FadeInOut } from 'ugcomponents/Animation/index';
import PasswordHelpBlock from '../index';

const inputValue = 'Test1234';

const renderedComponent = shallow(
  <PasswordHelpBlock inputValue={inputValue} />,
);

describe('<PasswordHelpBlock />', () => {
  it('should exists', () => {
    expect(PasswordHelpBlock);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render children', () => {
    const block = renderedComponent.find(FadeInOut);
    expect(block.length).toBe(4);
  });
  it('should render with visibility true', () => {
    const visibility = shallow(
      <PasswordHelpBlock inputValue={inputValue} visibility />,
    );
    const block = visibility.find(FadeInOut);
    expect(block.length).toBe(4);
  });
  it('should render with severError', () => {
    const serverError = 'myerror';
    const content = shallow(
      <PasswordHelpBlock
        serverError={serverError}
        inputValue={inputValue}
        visibility
      />,
    );
    expect(content.text()).toMatch(serverError);
  });
  it('with one rule that is matched password render with severError', () => {
    const content = shallow(
      <PasswordHelpBlock
        rules={['matchedProject']}
        inputValue={inputValue}
        visibility
        validationTxt="correct"
      />,
    );
    const block = content.find(FadeInOut);
    expect(block.length).toBe(1);
  });
});
