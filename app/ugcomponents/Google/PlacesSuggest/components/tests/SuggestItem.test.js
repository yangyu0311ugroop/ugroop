/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { SuggestItem } from '../SuggestItem';

describe('smartComponents/Google/PlacesSuggest/SuggestItem', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      root: 'root',
      text: 'text',
    },
  });

  beforeEach(() => {
    wrapper = shallow(<SuggestItem {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(SuggestItem).toBeDefined();
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
