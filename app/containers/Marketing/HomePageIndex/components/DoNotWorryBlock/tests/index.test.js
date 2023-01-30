import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { DoNotWorryBlock } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingDoNotWorryBlock', stylesheet, theme);

describe('DoNotWorryBlock', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<DoNotWorryBlock classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
