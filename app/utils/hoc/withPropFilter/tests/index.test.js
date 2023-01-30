import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import withPropFilter from '../index';

describe('utils/hoc/withPropFilter', () => {
  let wrapper;

  const filter = ['resaga'];
  const Component = () => <div />;
  const Hoc = withPropFilter({ filter })(Component);

  const makeProps = () => ({
    resaga: 1,
    notResaga: 2,
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
  });

  it('exists', () => {
    expect(withPropFilter).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
