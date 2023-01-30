import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SelectActivityDetail from 'smartComponents/Event/logics/SelectActivityDetail';

import { withActivityDetailId } from '../index';

describe('<SelectActivityDetail />', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withActivityDetailId()(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withActivityDetailId).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();

      expect(
        toJSON(wrapper.find(SelectActivityDetail).renderProp('children')(1)),
      ).toMatchSnapshot();
    });
  });
});
