/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { UnderConstructionDialog } from '..';

describe('<UnderConstructionDialog />', () => {
  let wrapper;

  const makeProps = () => ({
    open: false,
    onClose: () => {},
  });

  beforeEach(() => {
    wrapper = shallow(<UnderConstructionDialog {...makeProps()} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(UnderConstructionDialog).toBeDefined();
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
