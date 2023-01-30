/**
 * Testing the Loadable
 */

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import Loadable from '../Loadable';

describe('<Loadable />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<Loadable {...props} />);
  });

  it('should exists', () => {
    expect(Loadable).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
