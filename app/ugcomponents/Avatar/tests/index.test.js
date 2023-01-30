import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { Avatar } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('Avatar', stylesheet);

describe('Avatar', () => {
  it('should render an avatar with avatarUrl', () => {
    const wrapper = shallow(<Avatar classes={mockStyle} avatarUrl="/sample" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render element with name', () => {
    const wrapper = shallow(
      <Avatar name="Yow" classes={mockStyle} avatarUrl="/sample" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
