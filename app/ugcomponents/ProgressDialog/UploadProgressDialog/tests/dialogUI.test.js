import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UploadProgressDialogUI } from '../dialogUI';
import { AWAITING_UPLOAD, UPLOADING } from '../constants';

describe('UploadProgressDialog/index ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <UploadProgressDialogUI classes={{}} filename="test-file.txt" />,
    );
  });

  it('should exist ', () => {
    expect(UploadProgressDialogUI).toBeDefined();
  });

  it('should render without exploding ', () => {
    expect(wrapper.length).toBe(1);
  });

  it('still matches snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should show nothing if dialogState is AWAITING_UPLOAD', () => {
    wrapper.setProps({ dialogState: AWAITING_UPLOAD });
    expect(toJSON(wrapper)).toBe('');
  });

  it('should show something if dialogState is not AWAITING_UPLOAD (1)', () => {
    wrapper.setProps({ dialogState: UPLOADING, remaining: 34 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
