import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { LoadingDialog } from '../index';

describe('<LoadingDialog />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<LoadingDialog>Children</LoadingDialog>);
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(LoadingDialog).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
