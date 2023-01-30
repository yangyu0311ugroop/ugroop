/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composedWithCanEditFlightBooking, {
  withCanEditFlightBooking,
} from '../index';

describe('smartComponents/Event/hoc/withCanEditFlightBooking', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withCanEditFlightBooking(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withCanEditFlightBooking).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithCanEditFlightBooking(Component)).toBeDefined();
    });
  });
});
