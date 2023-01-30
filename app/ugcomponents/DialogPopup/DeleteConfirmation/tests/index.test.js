/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DeleteConfirmationDialog } from '..';

describe('<DeleteConfirmationDialog />', () => {
  let wrapper;

  const makeProps = () => ({
    open: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  beforeEach(() => {
    wrapper = shallow(<DeleteConfirmationDialog {...makeProps()} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DeleteConfirmationDialog).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
