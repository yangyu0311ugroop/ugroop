import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { ConnectedListItem } from '../index';

describe('ConnectedListItem', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<ConnectedListItem />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        id: 1,
      });
      instance.renderItem = jest.fn(() => 'renderItem');
      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderItem', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.renderItem({ userId: 1 })}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null', () => {
      expect(instance.renderItem({ userId: null })).toEqual(null);
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
