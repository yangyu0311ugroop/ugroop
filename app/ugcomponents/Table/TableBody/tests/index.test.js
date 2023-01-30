import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TableBody } from '../index';
import styles from '../styles';

const mockStyle = mockStylesheet('TableBody', styles);

describe('<TableBody />', () => {
  let rendered;

  const props = {
    classes: mockStyle,
  };

  beforeEach(() => {
    rendered = shallow(<TableBody {...props} />);
  });

  it('should exists', () => {
    expect(TableBody).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
