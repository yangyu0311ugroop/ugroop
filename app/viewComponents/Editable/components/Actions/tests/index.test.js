import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableActions } from '../index';

describe('<EditableActions />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <EditableActions classes={{ root: 'root' }}>Children</EditableActions>,
    );
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableActions).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
