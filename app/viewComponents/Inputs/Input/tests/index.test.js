import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Input } from '..';

describe('<Input />', () => {
  let wrapper;

  const makeProps = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Input {...makeProps()} />);
  });

  it('exists', () => {
    expect(Input).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
