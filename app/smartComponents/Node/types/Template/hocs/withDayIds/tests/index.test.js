/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composed, { withDayIds } from '../index';

describe('smartComponents/Event/hoc/withDayIds', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withDayIds(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withDayIds).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composed(Component)).toBeDefined();
    });
  });
});
