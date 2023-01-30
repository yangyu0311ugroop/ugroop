import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import styles from '../styles';
import { Icon } from '../index';

const classes = mockStylesheet('Icon', styles, theme);

describe('Icon/tests/index.test.js', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Icon icon="" classes={classes} />);
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(Icon).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render an icon', () => {
      rendered.setProps({ icon: 'folder' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('linear icon', () => {
    it('should append lnr', () => {
      expect(instance.appendIconPrefix('folder', 'lnr')).toBe('lnr-folder');
    });
    it('should keep its name', () => {
      rendered = shallow(<Icon icon="lnr-folder" classes={{}} />);
      expect(instance.appendIconPrefix('lnr-folder', 'lnr')).toBe('lnr-folder');
    });
    it('auto-detects linearicon variant', () => {
      rendered = shallow(<Icon icon="lnr-icon" classes={{}} />);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('UGroop Fonts Icons', () => {
    it('should append ug', () => {
      expect(instance.appendIconPrefix('ugroop', 'ug')).toBe('ug-ugroop');
    });
    it('should keep its name', () => {
      expect(instance.appendIconPrefix('ug-ugroop', 'ug')).toBe('ug-ugroop');
    });
    it('UGroop Icon', () => {
      rendered = shallow(<Icon icon="ug-ugroop" classes={{}} />);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('UGroop Logo', () => {
      rendered = shallow(<Icon icon="ug-logo" classes={{}} />);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('UGroop Font', () => {
      rendered = shallow(
        <Icon ugFont classes={{}}>
          ugroop
        </Icon>,
      );
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('UGroop Font without children', () => {
      rendered = shallow(<Icon ugFont icon="ugroop" classes={{}} />);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('bold icon', () => {
    it('should render bold', () => {
      rendered.setProps({ bold: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
