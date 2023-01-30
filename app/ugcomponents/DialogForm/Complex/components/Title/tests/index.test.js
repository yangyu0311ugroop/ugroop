/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Title } from '..';

describe('DialogForm/Complex/<Title />', () => {
  let wrapper;

  const makeProps = () => ({
    className: 'someClassName',
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Title {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Title).toBeDefined();
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot with subheading', () => {
      wrapper.setProps({ subheading: 'Subheading' });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot with render functions', () => {
      wrapper.setProps({
        renderHeading: () => 'renderHeading',
        renderSubheading: () => 'Subheading',
      });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
