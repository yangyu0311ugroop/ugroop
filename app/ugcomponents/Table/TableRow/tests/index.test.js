import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TableRow } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TableRow', styles);

describe('<TableRow />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
  };

  beforeEach(() => {
    rendered = shallow(<TableRow {...props} />);
  });

  it('should exists', () => {
    expect(TableRow).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
