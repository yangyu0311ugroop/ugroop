/**
 * Created by quando on 1/7/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Form, { Wrapped } from '../index';

describe('<Form />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Form>Hi Form</Form>);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(Form).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('<Wrapped /> still matches snapshot', () => {
      expect(
        toJSON(shallow(<Wrapped className="className">Children</Wrapped>)),
      ).toMatchSnapshot();
    });
  });
});
