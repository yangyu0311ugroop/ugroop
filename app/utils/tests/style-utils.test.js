import { fontScale } from 'theme/scale';
import { H1, H2, H3, H4, H5, H6, TITLE, P } from 'utils/constants/fontTypes';
import {
  generateFontSizes,
  generateFontClass,
  convertStyleClass,
  themeSelector,
} from '../style-utils';

const style = {
  blue: {
    background: '#7097EB',
    boxShadow: {
      x: 0,
      y: 1,
      blur: null,
      spread: null,
      color: '#668EE5',
    },
    color: 'white',
    '&:hover, &.focus': {
      background: '#668EE5',
      transition: [['ease-out', '1ms']],
    },
  },
};

describe('Test ConvertStyleClass', () => {
  it('should return correct ', () => {
    const obj = convertStyleClass(style, 'blue');
    expect(obj).toBe(style.blue);
  });
  it('should return null ', () => {
    const obj = convertStyleClass(style, 'notexist');
    expect(obj).toBe(undefined);
  });
});

describe('Test ThemeSelector', () => {
  it('should return false ', () => {
    expect(themeSelector({})).toBe(false);
  });
  it('should return false ', () => {
    expect(themeSelector({ location: { pathname: '/login' } })).toBe(false);
  });
  it('should return true ', () => {
    expect(themeSelector({ location: { pathname: 'features' } })).toBe(true);
  });
  it('should return true ', () => {
    expect(themeSelector({ location: { pathname: '/' } })).toBe(true);
  });
});

describe('Test generateFontSizes', () => {
  it('should return an object', () => {
    const breakpoints = { down: jest.fn() };
    const theme = { breakpoints, fontScale };
    expect(typeof generateFontSizes(theme, 1)).toBe('object');
  });
});

describe('Test generateFontClass', () => {
  it('should generate proper font class', () => {
    const list = [H1, H2, H3, H4, H5, H6, TITLE];
    const classes = {
      h1FontSize: H1,
      h2FontSize: H2,
      h3FontSize: H3,
      h4FontSize: H4,
      h5FontSize: H5,
      h6FontSize: H6,
      titleFontSize: TITLE,
    };
    list.forEach(type => {
      expect(generateFontClass(type, classes)).toBe(type);
    });
    expect(generateFontClass(P, classes)).toBe(classes.h5FontSize);
  });
});
