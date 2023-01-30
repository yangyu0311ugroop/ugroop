/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Button } from '../index';

describe('Button/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const classes = {
    block: 'block',
    dense: 'dense',
    first: 'first',
    inline: 'inline',
    green_loading: 'green_loading',
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Button classes={classes}>{children}</Button>);
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(Button).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('props', () => {
    it('children', () => {
      expect(rendered.contains(children)).toBe(true);
    });
    it('block true', () => {
      rendered = shallow(
        <Button classes={classes} block>
          {children}
        </Button>,
      );
      expect(rendered.find(`.${classes.block}`).length).toBe(1);
    });
    it('dense true', () => {
      rendered = shallow(
        <Button classes={classes} dense>
          {children}
        </Button>,
      );
      expect(rendered.find(`.${classes.dense}`).length).toBe(1);
    });
    it('loading true', () => {
      rendered = shallow(
        <Button classes={classes} loading color="green">
          {children}
        </Button>,
      );
      expect(rendered.find(`.${classes.green_loading}`).length).toBe(1);
    });

    it('should have noMargin + first + inline', () => {
      const renderedComponent = shallow(
        <Button classes={classes} textAlign noMargin first inline>
          {children}
        </Button>,
      );

      expect(toJSON(renderedComponent)).toMatchSnapshot();
    });
  });
});
