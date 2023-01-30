import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TableHeadCell } from '../index';

describe('<TableHeadCell />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<TableHeadCell {...props} />);
  });

  it('should exists', () => {
    expect(TableHeadCell).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
