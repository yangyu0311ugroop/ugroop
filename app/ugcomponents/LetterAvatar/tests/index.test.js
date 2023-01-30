/**
 * Created by edil on 9/6/17.
 */
import { shallow, mount } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { LetterAvatar } from '../index';
import styles from '../styles';

const mockStyle = mockStylesheet('LetterAvatar', styles);

describe('<LetterAvatar />', () => {
  it('should render properly', () => {
    const wrapper = shallow(<LetterAvatar classes={mockStyle} />);
    expect(wrapper.render()).toBeDefined();
  });
  it('should render LetterAvatar based on border color and color prop', () => {
    const wrapper = shallow(
      <LetterAvatar classes={mockStyle} borderColor="gray" color="white" />,
    );
    expect(wrapper.find(`.${mockStyle.grayBorderColor}`).length).toBe(1);
    expect(wrapper.find(`.${mockStyle.whiteBGColor}`).length).toBe(1);
  });
  it('should render LetterAvatar with displayed name', () => {
    const wrapper = mount(<LetterAvatar classes={mockStyle} displayName />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
