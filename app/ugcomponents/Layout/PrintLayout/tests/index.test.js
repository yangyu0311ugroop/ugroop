import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PrintLayout } from '../index';

describe('Print Layout Test', () => {
  let component;
  const children = '<div>children</div>';
  beforeEach(() => {
    component = shallow(<PrintLayout> {children} </PrintLayout>);
  });
  it('Shall render correct', () => {
    expect(toJSON(component)).toMatchSnapshot();
  });
});
