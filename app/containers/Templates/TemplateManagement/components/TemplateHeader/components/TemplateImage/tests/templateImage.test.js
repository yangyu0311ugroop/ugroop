import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateImage, stylesheet } from '../templateImage';

const mockStyle = mockStylesheet('TemplateImage', stylesheet);

describe('TemplateImage renderer', () => {
  it('should display what it should display if imgSrc is present', () => {
    const wrapper = shallow(
      <TemplateImage classes={mockStyle} imgSrc="sample" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should display what it should display if imgSrc is absent', () => {
    const wrapper = shallow(<TemplateImage classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
