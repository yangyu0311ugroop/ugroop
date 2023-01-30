import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { PublicFooter } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('PublicFooter', stylesheet);

describe('PublicFooter', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(<PublicFooter classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
