import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { CreateButton } from '../index';

describe('<CreateButton />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<CreateButton classes={{ root: 'root' }} />);
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(CreateButton).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
