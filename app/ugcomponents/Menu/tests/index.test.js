import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { UGMenu, styleSheet } from '../index';

const mockStyle = mockStylesheet('UGMenu', styleSheet);

describe('UGMenu component', () => {
  it('should Menu of material-ui with custom style', () => {
    const wrapper = shallow(<UGMenu classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
