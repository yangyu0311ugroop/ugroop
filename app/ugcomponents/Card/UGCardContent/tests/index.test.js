/**
 * Created by paulcedrick on 6/16/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { UGCardContent } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('UGCardContent', styles);

describe('<UGCardContent /> component', () => {
  const sampleText = 'as it is written: “None is righteous, no, not one;"';
  let rendered;

  beforeEach(() => {
    rendered = shallow(<UGCardContent classes={mockStyles} />);
  });

  it('should render given the props provided', () => {
    rendered.setProps({
      className: 'Jesus-Is-The-Way',
      children: sampleText,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something even without children and className provided', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
