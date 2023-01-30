/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import H5 from 'components/H5';
import { Information } from '../index';

describe('Information/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const classes = {
    wrapperFirst: 'wrapperFirst',
    wrapper: 'wrapper',
    actions: 'actions',
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Information classes={classes}>{children}</Information>);
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(Information).toBeDefined();
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
      rendered = shallow(<Information classes={classes} />);
      expect(rendered.contains(empty)).toBe(false);
    });
  });
});
