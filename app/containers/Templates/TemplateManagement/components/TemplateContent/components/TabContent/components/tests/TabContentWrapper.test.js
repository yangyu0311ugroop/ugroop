/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Tab } from '../TabContentWrapper';

describe('<Tab />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      tab: 'tab',
    },
  });

  beforeEach(() => {
    wrapper = shallow(<Tab {...makeProps()} />);
  });

  it('exists', () => {
    expect(Tab).toBeDefined();
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
