import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableMenuItemValue } from '../index';

describe('<EditableMenuItemValue />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <EditableMenuItemValue classes={{}} userId={1} onSelect={jest.fn()}>
        Children
      </EditableMenuItemValue>,
    );
    instance = rendered.instance();
  });

  describe('#getIcon()', () => {
    it('returns icon if props.onSelect=null and !hideIcon', () => {
      rendered.setProps({ onSelect: null, hideIcon: false });
      expect(instance.getIcon()).toEqual('lnr-check');
    });
  });

  describe('#getMenuItemProps()', () => {
    it('still matches snapshot if selected', () => {
      expect(instance.getMenuItemProps(true)).toMatchSnapshot();
    });
  });

  describe('#getMenuItemIconProps()', () => {
    it('returns this.SelectedMenuItemIconProps if selected', () => {
      const SelectedMenuItemIconProps = 'SelectedMenuItemIconProps';
      instance.SelectedMenuItemIconProps = SelectedMenuItemIconProps;
      expect(instance.getMenuItemIconProps(true)).toBe(
        SelectedMenuItemIconProps,
      );
    });
  });

  describe('#getMenuItemContentProps()', () => {
    it('still matches snapshot if selected', () => {
      expect(instance.getMenuItemContentProps(true)).toMatchSnapshot();
    });
  });

  describe('#handleSelect()', () => {
    it('calls props.onSelect with event.target.checked', () => {
      const checked = true;
      const event = { target: { checked } };
      instance.handleSelect(event);
      expect(instance.props.onSelect).toBeCalledWith(checked);
    });
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableMenuItemValue).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
