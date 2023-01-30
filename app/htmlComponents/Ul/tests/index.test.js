import React from 'react';
import { shallow } from 'enzyme';
import toJSOn from 'enzyme-to-json';
import { UlTest as Ul } from '../index';
import Li from '../../Li';

describe('Ul/tests/index.test.js', () => {
  let rendered;
  const children = <Li>This is a list item</Li>;
  beforeEach(() => {
    rendered = shallow(<Ul classes={{}} component={Li} items={['test']} />);
  });

  describe('smoke tests', () => {
    it('should exist', () => {
      expect(Ul).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSOn(rendered)).toMatchSnapshot();
    });
    it('should render a <ul> tag', () => {
      expect(rendered.type()).toEqual('ul');
    });
  });

  describe('content', () => {
    it('should render children', () => {
      rendered = shallow(<Ul classes={{}}>{children}</Ul>);
      expect(toJSOn(rendered)).toMatchSnapshot();
    });
    it('should render a component passed from a function', () => {
      const ComponentToRender = () => <Li>Sample list item</Li>;
      rendered = shallow(<Ul classes={{}} component={ComponentToRender} />);
      expect(toJSOn(rendered)).toMatchSnapshot();
    });
  });
});
