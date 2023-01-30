import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { CompaniesBlock } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingCompaniesBlock', stylesheet);

describe('CompaniesBlock', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<CompaniesBlock classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
