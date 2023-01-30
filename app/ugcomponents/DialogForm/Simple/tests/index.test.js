/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { SimpleDialogForm } from '..';

describe('<SimpleDialogForm />', () => {
  let wrapper;

  const makeProps = () => ({
    children: 'Children',
    open: true,
    onClose: () => {},
    canSubmitForm: true,
    submitForm: () => {},
    cancelForm: () => () => {},
    classes: { children: 'children' },
  });

  beforeEach(() => {
    wrapper = shallow(<SimpleDialogForm {...makeProps()} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(SimpleDialogForm).toBeDefined();
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
