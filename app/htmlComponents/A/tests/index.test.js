import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { A } from '../index';

describe('A/tests/index.test.js', () => {
  const href = 'https://www.google.com/';
  const children = <h3>Test</h3>;
  const props = {};
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <A {...props} classes={{}}>
        {children}
      </A>,
    );
  });

  describe('smoke tests', () => {
    it('should exist', () => {
      expect(A).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });

    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('href', () => {
    it('should have an href', () => {
      rendered.setProps({ href });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
