import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { ShareFrom } from '..';

describe('<ShareFrom />', () => {
  let wrapper;

  const makeProps = () => ({
    classes: {
      shareFromEllipsis: 'shareFromEllipsis',
    },
    value: 0,
  });

  beforeEach(() => {
    wrapper = shallow(<ShareFrom {...makeProps()} />);
  });

  it('exists', () => {
    expect(ShareFrom).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
