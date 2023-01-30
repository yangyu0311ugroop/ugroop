/**
 * Created by edil on 7/5/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import UGSelect from '../index';
import options from './select_constants';

const mockOnChange = jest.fn();
const placeholder = 'some placeholder';
const name = 'some name';

const wrapper = shallow(
  <UGSelect
    name={name}
    options={options}
    onChange={mockOnChange}
    placeholder={placeholder}
  />,
);

describe('<UGSelect />', () => {
  it('should render what should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('calls onChange properly', () => {
    wrapper.simulate('change');
    expect(mockOnChange).toHaveBeenCalled();
  });
});
