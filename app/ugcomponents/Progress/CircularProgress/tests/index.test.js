import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { UGCircularProgress, styleSheet } from '../index';

const mockStyle = mockStylesheet('CircularProgress', styleSheet);

describe('UGCircularProgress Component', () => {
  it('should render something', () => {
    const wrapper = shallow(<UGCircularProgress classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
