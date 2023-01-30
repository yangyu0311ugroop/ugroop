import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { PlansBlock } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingPlansBlock', stylesheet, theme);

describe('PlansBlock', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<PlansBlock classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
