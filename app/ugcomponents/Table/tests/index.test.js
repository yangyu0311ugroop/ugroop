import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Table } from '../index';
import styles from '../styles';

describe('<Table />', () => {
  let rendered;

  const props = {
    classes: styles,
  };

  beforeEach(() => {
    rendered = shallow(<Table {...props} />);
  });

  it('should exists', () => {
    expect(Table).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
