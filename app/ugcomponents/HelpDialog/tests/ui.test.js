import React from 'react';
import { shallow } from 'enzyme';
import { HelpDialogUI } from '../ui';

describe('<HelpDialogUI />', () => {
  let wrapper;
  let onClose;
  let classes;

  beforeEach(() => {
    classes = {};
    onClose = jest.fn();
    wrapper = shallow(
      <HelpDialogUI
        onClose={onClose}
        classes={classes}
        dialogTitle="Dialog Title"
      >
        <p>Sample content</p>
      </HelpDialogUI>,
    );
  });

  it('should exist', () => {
    expect(HelpDialogUI).toBeDefined();
  });

  it('should not explode', () => {
    expect(wrapper).toHaveLength(1);
  });
});
