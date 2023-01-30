import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableMenuItemInput } from '../index';

describe('<EditableMenuItemInput />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <EditableMenuItemInput classes={{ root: 'root' }}>
        Children
      </EditableMenuItemInput>,
    );
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableMenuItemInput).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
