import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { Header } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingHeader', stylesheet, theme);

describe('Header', () => {
  it('should render something with only classes as prop', () => {
    const wrapper = shallow(<Header classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render depending on the props "as"', () => {
    for (let i = 0; i < 6; i += 1) {
      const wrapper = shallow(<Header classes={mockStyle} as={`h${i + 1}`} />);
      expect(toJSON(wrapper)).toMatchSnapshot();
    }

    const wrapper = shallow(<Header classes={mockStyle} as="NoneExisting" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render when isThin is true', () => {
    const wrapper = shallow(<Header classes={mockStyle} isThin />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render what it should render depending to "color" props', () => {
    const listOfColors = ['black', 'orange', 'qweqwe'];
    for (let i = 0; i < listOfColors.length; i += 1) {
      const wrapper = shallow(
        <Header classes={mockStyle} color={listOfColors[i]} />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    }
  });
});
