/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composedWithCanEditEvent, { withCanEditEvent } from '../index';

describe('smartComponents/Event/hoc/withCanEditEvent', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withCanEditEvent(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withCanEditEvent).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithCanEditEvent(Component)).toBeDefined();
    });
  });
});
