import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { UGMarketingLink } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingUGLink', stylesheet, theme);

describe('MarketingUGLink', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<UGMarketingLink classes={mockStyle} to="/" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render if link isButton', () => {
    const wrapper = shallow(
      <UGMarketingLink classes={mockStyle} isButton to="/" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render depending on outline', () => {
    const wrapper = shallow(
      <UGMarketingLink classes={mockStyle} isButton outline="orange" to="/" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
