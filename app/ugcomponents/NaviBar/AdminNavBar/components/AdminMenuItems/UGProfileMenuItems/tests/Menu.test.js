/**
 * Created by Yang on 24/2/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import UGLink from 'components/Link';
import MenuComponent from '../Menu';

describe('<Menu />', () => {
  const props = {
    link: '/abc',
    icon: 'abc',
    menuName: 'menu',
  };

  const wrapper = shallow(<MenuComponent {...props} />);

  it('should render an <Link>', () => {
    const link = wrapper.find(UGLink);
    expect(link.prop('to')).toEqual('/abc');
  });
  it('should have icon and menu name', () => {
    const link = wrapper.find(UGLink);
    expect(link.contains(<i className="abc" />)).toEqual(true);
    expect(link.contains('menu')).toEqual(true);
  });
  it('properly calls preventDefault function', () => {
    const mockPreventDefault = jest.fn();
    const e = { preventDefault: mockPreventDefault };
    wrapper.props().onClick(e);
    expect(mockPreventDefault).toBeCalled();
  });
  it('properly calls handleOnClick props', () => {
    const mockHandlesOnClick = jest.fn();
    wrapper.setProps({ handlesOnClick: mockHandlesOnClick });
    wrapper.find(UGLink).simulate('click');
    expect(mockHandlesOnClick).toBeCalled();
  });
});
