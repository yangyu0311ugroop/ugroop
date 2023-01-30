/**
 * Created by stephenkarpinskyj on 29/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import withFormsyInterceptor from '../index';

describe('utils/hoc/withFormsyInterceptor', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withFormsyInterceptor(Component);

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
  });

  it('exists', () => {
    expect(withFormsyInterceptor).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
