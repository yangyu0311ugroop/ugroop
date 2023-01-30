import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composedWithTimelineId, { withTimelineId } from '../index';

describe('hoc/withTimelineId', () => {
  let wrapper;

  const Component = () => <div />;
  const Hoc = withTimelineId(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withTimelineId).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithTimelineId(Component)).toBeDefined();
    });
  });
});
