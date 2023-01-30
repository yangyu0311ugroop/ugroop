import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { TourganizerBlock } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet(
  'MarketingTourganizerBlock',
  stylesheet,
  theme,
);

describe('TourganizerBlock', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<TourganizerBlock classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
