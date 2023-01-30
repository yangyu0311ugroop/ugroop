import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { Description } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingDescription', stylesheet, theme);

describe('Description', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<Description classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render if "isBold" is true', () => {
    const wrapper = shallow(<Description classes={mockStyle} isBold />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
