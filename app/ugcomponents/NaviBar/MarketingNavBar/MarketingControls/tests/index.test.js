import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { MarketingControls, stylesheet } from '../index';

const mockStyle = mockStylesheet('MarketingControls', stylesheet);

describe('MarketingControls', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<MarketingControls classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
