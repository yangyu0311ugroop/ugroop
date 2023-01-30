import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { TitleOfAddTemplateModal } from '../index';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('TitleOfAddTemplateModal', stylesheet, theme);

describe('TitleOfAddTemplateModal', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<TitleOfAddTemplateModal classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
