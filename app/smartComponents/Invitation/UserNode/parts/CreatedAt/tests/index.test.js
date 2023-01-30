import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { CreatedAt } from '..';

describe('<CreatedAt />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      shareFromEllipsis: 'shareFromEllipsis',
    },
    value: 0,
  });

  beforeEach(() => {
    wrapper = shallow(<CreatedAt {...makeProps()} />);
  });

  it('exists', () => {
    expect(CreatedAt).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
