import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { ReadOnlyWrapper } from '../index';
import style from '../style';

describe('<ReadOnlyWrapper />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<ReadOnlyWrapper classes={{}} bold />);
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(ReadOnlyWrapper).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('ReadOnlyWrapper style', () => {
    it('should match snapshot', () => {
      const snapshot = mockStylesheet('', style, coolTheme);
      expect(snapshot).toMatchSnapshot();
    });
  });
});
