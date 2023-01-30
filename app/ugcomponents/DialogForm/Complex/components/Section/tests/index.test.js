/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Section } from '..';

describe('DialogForm/Complex/<Section />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      panelExpanded: 'panelExpanded',
      summaryRoot: 'summaryRoot',
      summaryContent: 'summaryContent',
      detailsRoot: 'detailsRoot',
    },
    children: 'Children',
    title: 'Title',
  });

  beforeEach(() => {
    wrapper = shallow(<Section {...makeProps()} />);
  });

  it('exists', () => {
    expect(Section).toBeDefined();
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
