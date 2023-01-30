import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LiTest as Li } from '../index';

describe('Li/tests/index.test.js', () => {
  let rendered;
  const children = <span>Child</span>;

  beforeEach(() => {
    rendered = shallow(<Li classes={{}}>{children}</Li>);
  });

  describe('smoke tests', () => {
    it('should exist', () => {
      expect(Li).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });

    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
