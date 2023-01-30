import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TableHeader } from '../index';

describe('<TableHeader />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<TableHeader {...props} />);
  });

  it('should exists', () => {
    expect(TableHeader).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
