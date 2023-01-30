import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableMenuItemSubmit } from '../index';

describe('<EditableMenuItemSubmit />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <EditableMenuItemSubmit
        classes={{ root: 'root', disabled: 'disabled' }}
        disabled
      >
        Children
      </EditableMenuItemSubmit>,
    );
    instance = rendered.instance();
  });

  describe('#getMenuItemIconProps()', () => {
    it('still matches snapshot if not props.disabled', () => {
      rendered.setProps({ disabled: false });
      expect(instance.getMenuItemIconProps()).toMatchSnapshot();
    });
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableMenuItemSubmit).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
