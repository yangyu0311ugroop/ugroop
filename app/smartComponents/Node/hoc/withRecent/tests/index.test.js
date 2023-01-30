import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composedWithRecent, { withRecent } from '../index';

describe('withRecent', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withRecent(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withRecent).toBeDefined();
  });

  describe('recent()', () => {
    it('should return null', () => {
      rendered.setProps({ recent: [1], stars: [] });

      expect(instance.recent()).toEqual([1]);
    });

    it('should recent', () => {
      rendered.setProps({ recent: [1, 2, 3], stars: [2] });

      expect(instance.recent()).toEqual([1, 3]);
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithRecent(Component)).toBeDefined();
    });
  });
});
