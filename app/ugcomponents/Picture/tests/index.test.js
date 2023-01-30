/**
 * Created by paulcedrick on 6/21/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import mockStylesheet from 'utils/mockStylesheet';
import { UGPicture } from '../index';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('UGPicture', stylesheet);

describe('<UGPicture /> component', () => {
  const imageUrl = 'https://www.placecage.com/100/100';
  it('should exist', () => {
    const wrapper = shallow(<UGPicture classes={mockStyle} />);
    expect(wrapper.render()).toBeDefined();
  });
  it('should contain UGImage component', () => {
    const wrapper = shallow(
      <UGPicture classes={mockStyle} imageUrl={imageUrl} />,
    );
    expect(wrapper.find('UGImage').length).toBe(1);
  });
  it('should accept imageUrl props and pass it to UGImage component', () => {
    const wrapper = shallow(
      <UGPicture classes={mockStyle} imageUrl={imageUrl} />,
    );
    expect(wrapper.find('UGImage').props().imageUrl).toBe(imageUrl);
  });
  it('should always pass small props to UGImage component', () => {
    const wrapper = shallow(
      <UGPicture classes={mockStyle} imageUrl={imageUrl} />,
    );
    expect(wrapper.find('UGImage').props().size).toBe('small');
  });
});
