import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { DeleteButton } from '../index';

describe('<DeleteButton />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<DeleteButton>Children</DeleteButton>);
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(DeleteButton).toBeDefined();
    });
  });

  describe('handleDeleteButtonClick', () => {
    it('should setState', () => {
      instance.handleDeleteButtonClick({ stopPropagation: jest.fn() });
      expect(rendered.state().open).toBe(true);
    });
  });

  describe('handleDialogConfirmClick', () => {
    it('should setState', () => {
      const ev = { stopPropagation: jest.fn() };
      instance.handleDialogConfirmClick(ev, { onLoad: jest.fn() });
      expect(ev.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('handleDialogCancelClick', () => {
    it('should setState', () => {
      instance.handleDialogCancelClick({ stopPropagation: jest.fn() });
      expect(rendered.state().open).toBe(false);
    });
  });

  describe('handleDialogClose', () => {
    it('should setState', () => {
      instance.handleDialogClose();
      expect(rendered.state().open).toBe(false);
    });
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(DeleteButton).toBeDefined();
    });

    it('still matches snapshots', () => {
      instance.renderDeleteIconButton = jest.fn(() => 'renderDeleteIconButton');
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshots renderProp', () => {
      expect(toJSON(instance.renderProp())).toMatchSnapshot();
    });

    it('still matches snapshots renderProp', () => {
      instance.renderProp = jest.fn(() => 'renderProp');
      rendered.setProps({ renderProp: jest.fn(() => 'test') });
      expect(toJSON(instance.renderButton())).toMatchSnapshot();
    });

    it('still matches snapshots if not icon button', () => {
      rendered.setProps({ iconButton: false });
      instance.renderDeleteButton = jest.fn(() => 'renderDeleteButton');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('still matches snapshots if not icon button simple', () => {
      rendered.setProps({ iconButton: true, simple: true });
      instance.renderDeleteButton = jest.fn(() => 'renderDeleteButton');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClick()', () => {
      expect(() => {
        DeleteButton.defaultProps.onClick();
      }).not.toThrow();
    });
  });
});
