import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TableHead } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TableHead', styles);

describe('<TableHead />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
  };

  beforeEach(() => {
    rendered = shallow(<TableHead {...props} />);
  });

  it('should exists', () => {
    expect(TableHead).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
