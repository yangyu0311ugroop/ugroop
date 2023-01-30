/**
 * Created by paulcedrick on 7/11/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGSnackbar } from '../index';

describe('UGSnackbar component', () => {
  let wrapper;
  let onClose;

  beforeEach(() => {
    onClose = jest.fn();

    wrapper = shallow(<UGSnackbar onClose={onClose} />);
  });

  it('should render material-ui snackbar', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render the icon when present', () => {
    wrapper.setProps({ icon: <img src="/someimg.jpg" alt="Test" /> });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should not render the icon when not present', () => {
    wrapper.setProps({ icon: null });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
