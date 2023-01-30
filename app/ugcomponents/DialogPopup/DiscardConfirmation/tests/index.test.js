/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { DiscardConfirmationDialog } from '..';

describe('<DiscardConfirmationDialog />', () => {
  let wrapper;

  const makeProps = () => ({
    open: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  beforeEach(() => {
    wrapper = shallow(<DiscardConfirmationDialog {...makeProps()} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DiscardConfirmationDialog).toBeDefined();
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
