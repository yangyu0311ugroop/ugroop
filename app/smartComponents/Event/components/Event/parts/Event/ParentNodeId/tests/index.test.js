/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { ParentNodeId } from '..';

describe('<ParentNodeId />', () => {
  let wrapper;

  const makeProps = () => ({
    defaultValue: 1,
  });

  beforeEach(() => {
    wrapper = shallow(<ParentNodeId {...makeProps()} />);
  });

  it('exists', () => {
    expect(ParentNodeId).toBeDefined();
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
