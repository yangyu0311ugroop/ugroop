import React from 'react';
import { shallow } from 'enzyme';
import { HelpDialog } from '../index';

describe('<HelpDialog />', () => {
  let wrapper;
  let onClose;

  beforeEach(() => {
    onClose = jest.fn();
    wrapper = shallow(
      <HelpDialog onClose={onClose} dialogTitle="Dialog Title">
        <p>Sample content</p>
      </HelpDialog>,
    );
  });

  it('should exist', () => {
    expect(HelpDialog).toBeDefined();
  });

  it('should not explode', () => {
    expect(wrapper).toHaveLength(1);
  });
});
