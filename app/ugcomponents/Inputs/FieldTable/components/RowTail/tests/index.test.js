/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FieldTableRowTail } from '..';

describe('<FieldTableRowTail />', () => {
  let wrapper;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<FieldTableRowTail {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FieldTableRowTail).toBeDefined();
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
