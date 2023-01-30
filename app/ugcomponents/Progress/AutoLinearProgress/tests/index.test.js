import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { LinearDeterminate, styles } from '../index';

const mockStyle = mockStylesheet('LinearProgress', styles);

describe('LinearDeterminate Component', () => {
  it('should render something', () => {
    const wrapper = shallow(
      <LinearDeterminate classes={mockStyle} timer={100} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
