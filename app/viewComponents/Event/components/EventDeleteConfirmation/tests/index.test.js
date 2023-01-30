/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EventDeleteConfirmation } from '..';

describe('<EventDeleteConfirmation />', () => {
  let wrapper;

  const makeProps = () => ({
    open: false,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<EventDeleteConfirmation {...makeProps()} />);
  });

  it('exists', () => {
    expect(EventDeleteConfirmation).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot with name', () => {
      wrapper.setProps({ name: 'Some name' });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
