import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EditablePlaceholder } from '../index';

describe('<EditablePlaceholder />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <EditablePlaceholder classes={{}}>Placeholder</EditablePlaceholder>,
    );
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditablePlaceholder).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
