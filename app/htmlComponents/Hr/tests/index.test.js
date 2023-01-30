import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { HrTest as Hr } from '../index';

describe('Hr/tests/index.test,js', () => {
  const children = <div>children</div>;
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Hr classes={{}} />);
  });

  describe('smoke tests', () => {
    it('should exist', () => {
      expect(Hr).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });

    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('rendering with children', () => {
    it('should render with children', () => {
      rendered.setProps({ children });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
