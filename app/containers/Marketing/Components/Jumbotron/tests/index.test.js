import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { Jumbotron } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingJumbotron', stylesheet, theme);

describe('Jumbotron', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<Jumbotron classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
