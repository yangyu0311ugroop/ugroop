import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import style from '../styles';
import { Button } from '../index';

describe('Button/tests/index.test.js', () => {
  const children = <span>Title</span>;
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Button classes={{}}>{children}</Button>);
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(Button).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('style snapshot', () => {
    it('should match snapshot', () => {
      const classes = mockStylesheet('Button', style, coolTheme);
      expect(classes).toMatchSnapshot();
    });
  });

  describe('icon button', () => {
    it('should render icon button', () => {
      rendered.setProps({ iconButton: true, icon: 'folder' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render small icon', () => {
      rendered.setProps({ iconButton: true, icon: 'folder', small: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render large icon', () => {
      rendered.setProps({ iconButton: true, icon: 'folder', large: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('button with tooltip', () => {
    it('should render a tooltip', () => {
      const tooltipProps = {
        title: 'Title',
        placement: 'top',
      };
      rendered.setProps({ tooltipProps });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should not render a tooltip', () => {
      const tooltipProps = {};
      rendered.setProps({ tooltipProps });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('buttonStyle', () => {
    it('should render inline', () => {
      rendered.setProps({ variant: 'inline' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render transparent outline', () => {
      rendered.setProps({ variant: 'outline', transparent: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render borderless', () => {
      rendered.setProps({ variant: 'borderless' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('button color', () => {
    it('should render primary color', () => {
      rendered.setProps({ color: 'primary' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render alert color', () => {
      rendered.setProps({ color: 'alert' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render gray color', () => {
      rendered.setProps({ color: 'gray' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render gray color', () => {
      rendered.setProps({ color: 'black' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('button size', () => {
    it('should render small size', () => {
      rendered.setProps({ size: 'small' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render large size', () => {
      rendered.setProps({ size: 'large' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('disabled button', () => {
    it('should be disabled', () => {
      rendered.setProps({ disabled: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('square button', () => {
    it('should be square', () => {
      rendered.setProps({ square: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('dense button', () => {
    it('should be densed', () => {
      rendered.setProps({ dense: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('block button', () => {
    it('should be block', () => {
      rendered.setProps({ block: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('loading button', () => {
    it('should render loading button', () => {
      rendered.setProps({ loading: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render outlineBase or borderlessBase loading button', () => {
      rendered.setProps({ loading: true, variant: 'outline' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render outlinePrimary or borderlessPrimary loading button', () => {
      rendered.setProps({
        loading: true,
        variant: 'outline',
        color: 'primary',
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render outlineAlert or borderlessAlert loading button', () => {
      rendered.setProps({ loading: true, variant: 'outline', color: 'alert' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render outlineGray or borderlessGray loading button', () => {
      rendered.setProps({ loading: true, variant: 'outline', color: 'gray' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
