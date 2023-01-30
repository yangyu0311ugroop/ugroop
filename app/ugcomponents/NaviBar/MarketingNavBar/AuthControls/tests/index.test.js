import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { AuthControls, stylesheet } from '../index';

const mockStyle = mockStylesheet('AuthControls', stylesheet);

describe('AuthControls', () => {
  it('should render what it should render with no props', () => {
    const wrapper = shallow(<AuthControls classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render when authenticated', () => {
    const wrapper = shallow(
      <AuthControls classes={mockStyle} isAuthenticated />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
