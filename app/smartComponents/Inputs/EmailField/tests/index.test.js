import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EmailField } from '..';

describe('<EmailField />', () => {
  let wrapper;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<EmailField {...makeProps()} />);
  });

  it('exists', () => {
    expect(EmailField).toBeDefined();
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
