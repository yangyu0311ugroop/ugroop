/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FieldTableFooter } from '..';

describe('<FieldTableFooter />', () => {
  let wrapper;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<FieldTableFooter {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FieldTableFooter).toBeDefined();
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
