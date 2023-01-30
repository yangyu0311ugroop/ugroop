/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FieldTableSeparator } from '..';

describe('<FieldTableSeparator />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: { root: 'root' },
  });

  beforeEach(() => {
    wrapper = shallow(<FieldTableSeparator {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(FieldTableSeparator).toBeDefined();
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
