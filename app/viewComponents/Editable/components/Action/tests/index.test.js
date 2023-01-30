import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableAction } from '../index';

describe('<EditableAction />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <EditableAction classes={{ root: 'root' }}>Children</EditableAction>,
    );
    instance = rendered.instance();
  });

  describe('#handleClick()', () => {
    it('calls props.onClick', () => {
      const ev = { stopPropagation: jest.fn() };
      rendered.setProps({ onClick: jest.fn() });
      instance.handleClick(ev);
      expect(ev.stopPropagation).toBeCalled();
      expect(instance.props.onClick).toBeCalledWith(ev);
    });
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableAction).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClick()', () => {
      expect(() => {
        EditableAction.defaultProps.onClick();
      }).not.toThrow();
    });
  });
});
