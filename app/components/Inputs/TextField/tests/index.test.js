/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { TextField } from '../index';

describe('TextField/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const classes = {
    valid: 'isValid',
    capitalize: 'capitalize',
    error: 'error',
    attachmentTextField: 'attachmentTextField',
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(<TextField classes={classes}>{children}</TextField>);
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(TextField).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('props', () => {
    it('isValid true', () => {
      const isValid = () => true;
      rendered = shallow(<TextField classes={classes} isValid={isValid} />);
      expect(rendered.find(`.${classes.valid}`).length).toBe(1);
    });
    it('capitalize true', () => {
      rendered = shallow(<TextField classes={classes} capitalize />);
      expect(rendered.find(`.${classes.capitalize}`).length).toBe(1);
    });
    it('attachmentTextField true', () => {
      rendered = shallow(<TextField classes={classes} attachmentTextField />);
      expect(rendered.find(`.${classes.attachmentTextField}`).length).toBe(1);
    });
    it('error true', () => {
      rendered = shallow(
        <TextField classes={classes} error>
          {children}
        </TextField>,
      );
      expect(rendered.find(`.${classes.error}`).length).toBe(1);
    });
  });
});
