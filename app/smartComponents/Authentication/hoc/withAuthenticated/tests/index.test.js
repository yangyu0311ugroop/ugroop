/**
 * Created by stephenkarpinskyj on 29/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composedWithAuthenticated, { withAuthenticated } from '../index';

describe('smartComponents/Authentication/withAuthenticated', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withAuthenticated(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withAuthenticated).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithAuthenticated(Component)).toBeDefined();
    });
  });
});
