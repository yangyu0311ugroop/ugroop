/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import H5 from 'components/H5';
import { Error } from '../index';

describe('Error/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const classes = {
    wrapperFirst: 'wrapperFirst',
    wrapper: 'wrapper',
    actions: 'actions',
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Error classes={classes}>{children}</Error>);
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(Error).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('props', () => {
    const empty = <H5>&nbsp;</H5>;

    it('children truthy', () => {
      expect(rendered.contains(empty)).toBe(false);
    });
    it('children falsy', () => {
      rendered = shallow(<Error classes={classes} />);
      expect(rendered.contains(empty)).toBe(false);
    });
  });
});
