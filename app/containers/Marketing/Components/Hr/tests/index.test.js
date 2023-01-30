import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { UGHr } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingHR', stylesheet, theme);

describe('Hr', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<UGHr classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render based on the size given to the component', () => {
    const wrapper = shallow(
      <UGHr classes={mockStyle} size={{ value: 20, unit: 'px' }} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
