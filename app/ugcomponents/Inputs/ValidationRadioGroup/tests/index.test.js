/**
 * Created by quando on 10/8/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { ValidationRadioGroup } from '../index';

describe('component/Form/TextField/index', () => {
  const props = {
    classes: {},
    label: 'test',
    required: true,
  };
  describe('Smoke test', () => {
    it('UGTextField should exists', () =>
      expect(ValidationRadioGroup).toBeDefined());
  });
  describe('Test props', () => {
    let rendered;
    const options = {
      1: 'Mon',
      2: 'Tue',
    };
    const hi = 'ho';
    beforeEach(() => {
      rendered = shallow(
        <ValidationRadioGroup options={options} hi={hi} {...props} />,
      );
    });
    it('should render without exploding', () =>
      expect(rendered.length).toBe(1));
    it('should render children', () => {
      expect(rendered.find(FormControlLabel).length).toBe(
        Object.keys(options).length,
      );
    });
  });
  describe('Test no Margin', () => {
    const options = {
      1: 'Mon',
      2: 'Tue',
    };
    const rendered = shallow(
      <ValidationRadioGroup options={options} noMargin {...props}>
        <p>test</p>
      </ValidationRadioGroup>,
    );
    it('should render without exploding', () =>
      expect(rendered.length).toBe(1));
  });
});
