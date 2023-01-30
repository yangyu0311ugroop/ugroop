/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { SectionHeader } from '../index';
import style from '../style';

describe('SectionHeader/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const classes = {
    wrapperFirst: 'wrapperFirst',
    wrapper: 'wrapper',
    actions: 'actions',
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <SectionHeader classes={classes}>{children}</SectionHeader>,
    );
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(SectionHeader).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('style', () => {
      expect(style).toBeDefined();
      expect(typeof style({})).toBe('object');
      expect(typeof style({ colorTone: 'warm' })).toBe('object');
    });
  });

  describe('props', () => {
    it('first true', () => {
      rendered = shallow(
        <SectionHeader classes={classes} first>
          {children}
        </SectionHeader>,
      );
      expect(rendered.find(`.${classes.wrapperFirst}`).length).toBe(1);
    });
    it('first false', () => {
      rendered = shallow(
        <SectionHeader classes={classes}>{children}</SectionHeader>,
      );
      expect(rendered.find(`.${classes.wrapper}`).length).toBe(1);
    });
    it('actions true', () => {
      rendered = shallow(
        <SectionHeader classes={classes} actions={classes.actions}>
          {children}
        </SectionHeader>,
      );
      expect(rendered.find(`.${classes.actions}`).length).toBe(1);
    });
  });
});
