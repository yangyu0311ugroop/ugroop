import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { UnderlineWrapper } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet(
  'MarketingUnderlineWrapper',
  stylesheet,
  theme,
);

describe('UnderlineWrapper', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<UnderlineWrapper classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
