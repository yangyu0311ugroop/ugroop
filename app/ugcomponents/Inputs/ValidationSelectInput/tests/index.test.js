import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MenuItem } from '@material-ui/core';
import { ValidationSelectInput } from '../index';

describe('ValidationSelectInput ', () => {
  describe('Smoke test', () => {
    it('ValidationSelectInput should render', () =>
      expect(ValidationSelectInput).toBeDefined());
  });
  describe('Test props', () => {
    let rendered;
    const options = [{ name: 'Australia', code: 'AUS' }];
    beforeEach(() => {
      rendered = shallow(
        <ValidationSelectInput name="name" options={options} />,
      );
    });
    it('should render without exploding', () =>
      expect(rendered.length).toBe(1));
    it('should render children', () => {
      expect(rendered.find(MenuItem).length).toBe(Object.keys(options).length);
    });

    it('render() still matches snapshot with no label', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('render() still matches snapshot with label', () => {
      rendered.setProps({ label: 'some label' });
      expect(toJSON(shallow(rendered.instance().render()))).toMatchSnapshot();
    });
  });
});
