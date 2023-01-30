import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { EmailListItem } from '../index';

describe('EmailListItem', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<EmailListItem />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        id: 1,
      });
      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('handleClick', () => {
    it('should be called', () => {
      rendered.setProps({
        onClick: jest.fn(),
      });
      instance.handleClick();
    });
  });

  describe('getRestProps', () => {
    it('should be called', () => {
      instance.getRestProps();
    });
  });
});
