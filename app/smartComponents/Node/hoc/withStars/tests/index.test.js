import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import composedWithStars, { withStars } from '../index';

describe('withStars', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withStars(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withStars).toBeDefined();
  });

  describe('stars()', () => {
    it('should return empty', () => {
      rendered.setProps({ stars: [1], toggleId: 2233, scope: [] });

      expect(instance.stars()).toEqual([]);
    });

    it('should return stars', () => {
      rendered.setProps({ stars: [1], scope: [] });

      expect(instance.stars()).toEqual([1]);
    });

    it('should scoped stars', () => {
      rendered.setProps({ stars: [1, 2, 3], scope: [2] });

      expect(instance.stars()).toEqual([2]);
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithStars(Component)).toBeDefined();
    });
  });
});
