import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PublicLayout } from '../index';

describe('Public Layout Test', () => {
  let component;
  const children = '<div>children</div>';
  beforeEach(() => {
    component = shallow(<PublicLayout>{children}</PublicLayout>);
  });
  it('Shall render correct', () => {
    expect(toJSON(component)).toMatchSnapshot();
  });
});
