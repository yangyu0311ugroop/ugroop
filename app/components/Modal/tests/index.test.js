/**
 * Created by edil on 6/27/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import UGModal from '../index';

const onHide = () => false;
const wrapper = shallow(
  <UGModal show onHide={onHide} title="Title" body="Body" footer="Footer" />,
);

// TODO: from Jay: this component should be reworked, skip tests for now
describe.skip('<UGModal />', () => {
  it('fetch all attributes properly', () => {
    expect(wrapper.unrendered.props.show).toBeDefined();
    expect(wrapper.unrendered.props.onHide).toBeDefined();
    expect(wrapper.unrendered.props.title).toBeDefined();
    expect(wrapper.unrendered.props.body).toBeDefined();
    expect(wrapper.unrendered.props.footer).toBeDefined();
  });
  it('calls the onHide method', () => {
    const mockOnHide = jest.fn();
    wrapper.setProps({ onHide: mockOnHide });
    wrapper.simulate('hide');
    expect(mockOnHide).toHaveBeenCalled();
  });
  it('changes the show attribute onHide', () => {
    const mockOnHide = () => {
      wrapper.setProps({ show: false });
    };
    wrapper.setProps({ onHide: mockOnHide });
    wrapper.simulate('hide');
    expect(wrapper.props().show).toEqual(false);
  });
});
