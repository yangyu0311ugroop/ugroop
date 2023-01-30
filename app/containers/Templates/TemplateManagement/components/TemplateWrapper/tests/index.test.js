import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import theme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateWrapper } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('TemplateWrapper', stylesheet, theme);

describe('TemplateWrapper', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<TemplateWrapper classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
