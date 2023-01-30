import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { Checkbox } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('Checkbox', styles);

describe('<Checkbox />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
  };

  beforeEach(() => {
    rendered = shallow(<Checkbox {...props} />);
  });

  it('should exists', () => {
    expect(Checkbox).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render with FormControl when it receives label props', () => {
    rendered.setProps({
      label: 'Bad company corrupts good character',
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
