/**
 * Testing our link component
 */

import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import UGRadioGroup from '../index';
const children = <h1>Test</h1>;
const renderComponent = () => shallow(<UGRadioGroup>{children}</UGRadioGroup>);

describe('<RadioGroup />', () => {
  it('should render a <RadioGroup> tag', () => {
    const renderedComponent = renderComponent();
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});
