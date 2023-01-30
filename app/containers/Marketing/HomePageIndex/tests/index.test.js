import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGHomePageIndex } from '../index';

describe('<UGHomePageIndex />', () => {
  it('renders the Homepage', () => {
    const renderedComponent = shallow(<UGHomePageIndex />);
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});
