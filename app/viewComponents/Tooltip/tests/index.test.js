import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import theme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import styles from '../styles';
import { Tooltip } from '../index';

const stylesheet = mockStylesheet('Tooltip', styles, theme);

describe('Tooltip/tests/index.js', () => {
  const children = <span>Title</span>;
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Tooltip classes={stylesheet}>{children}</Tooltip>);
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(Tooltip).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render properly is isLight is true', () => {
      rendered.setProps({
        isLight: true,
      });
    });
  });
});
