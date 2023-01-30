/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EventPatchData } from '..';

describe('<EventPatchData />', () => {
  let wrapper;

  const makeProps = () => ({
    id: 1,
    dataId: 2,
    subtype: true,
  });

  beforeEach(() => {
    wrapper = shallow(<EventPatchData {...makeProps()} />);
  });

  it('exists', () => {
    expect(EventPatchData).toBeDefined();
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
