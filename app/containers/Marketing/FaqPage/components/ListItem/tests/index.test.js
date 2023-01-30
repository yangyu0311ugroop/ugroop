import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { FAQListItem } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('FAQListItem', stylesheet, theme);

describe('ListItem', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<FAQListItem classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should display what it should display if ListItem state open is true', () => {
    const wrapper = shallow(<FAQListItem classes={mockStyle} />);
    wrapper.setState({
      open: true,
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  describe('onClick', () => {
    it('should toggle the open state of the component', () => {
      const wrapper = shallow(<FAQListItem classes={mockStyle} />);
      wrapper.instance().onClick();
      expect(wrapper.state().open).toBe(true);
    });
  });
});
