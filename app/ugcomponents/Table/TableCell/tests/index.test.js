import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TableCell } from '../index';
import styles from '../styles';

describe('<TableCell />', () => {
  let rendered;

  const props = {
    classes: styles,
  };

  beforeEach(() => {
    rendered = shallow(<TableCell {...props} />);
  });

  it('should exists', () => {
    expect(TableCell).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
