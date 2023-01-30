import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { FooterTop } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingFooterTop', stylesheet);

describe('FooterTop', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<FooterTop classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
