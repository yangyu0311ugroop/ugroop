/**
 * Testing the NotFoundPage
 */

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { NotFound } from '../index';

describe('<NotFound />', () => {
  let rendered;

  const props = {
    account: true,
  };

  beforeEach(() => {
    rendered = shallow(<NotFound {...props} />);
  });

  it('should exists', () => {
    expect(NotFound).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render authenticated 404', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render unauthenticated 404', () => {
    rendered.setProps({ account: false });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
