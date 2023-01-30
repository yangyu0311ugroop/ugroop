import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditableLabel } from '../index';

describe('<EditableLabel />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<EditableLabel classes={{}}>Label</EditableLabel>);
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableLabel).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
