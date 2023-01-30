import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableMenuItemClear } from '../index';

describe('<EditableMenuItemClear />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <EditableMenuItemClear classes={{ root: 'root' }}>
        Children
      </EditableMenuItemClear>,
    );
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableMenuItemClear).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
