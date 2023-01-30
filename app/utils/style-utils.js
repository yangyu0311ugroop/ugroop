/**
 * Created by Yang on 16/11/16.
 */
import { css } from 'styled-components';
import { H1, H2, H3, H4, H5, H6, TITLE } from 'utils/constants/fontTypes';

const media = {
  handheld: (...args) =>
    css`
      @media (max-width: 340px) {
        ${css(...args)};
      }
    `,
  tablet: (...args) =>
    css`
      @media (max-width: 768px) {
        ${css(...args)};
      }
    `,
};

function convertStyleClass(classes, variable) {
  return classes[`${variable}`];
}

const warmthemeConfig = ['/', '/features'];

function themeSelector({ location }) {
  if (location && location.pathname) {
    return warmthemeConfig.join(',').indexOf(location.pathname) > -1;
  }
  return false;
}

/**
 * Modular Scaling Computation for Font and Screen Sizes
 * @param {number} base initial size of the font
 * @param {number} ratio of the font sizes
 * @param {number} size, multiplier to differ font sizes
 */
const ms = (base, ratio, size) => `${base * ratio ** size}px`;

/**
 * Generates Font Sizes on each Breakpoints
 * @param {object} breakpoints, theme.breakpoints
 * @param {number} base, fontScale.base
 * @param {number} ratio, fontScale.ratio
 * @param {number} size
 * @returns {{fontSize: string, [p: string]: *}}
 */
const generateFontSizes = (
  { breakpoints, fontScale: { base, ratio } },
  size,
) => ({
  fontSize: ms(base, ratio.LG, size),
  [breakpoints.down('md')]: {
    fontSize: ms(base, ratio.MD, size),
  },
  [breakpoints.down('sm')]: {
    fontSize: ms(base, ratio.SM, size),
  },
  [breakpoints.down('xs')]: {
    fontSize: ms(base, ratio.XS, size),
  },
});

const generateFontClass = (type, classes) => {
  switch (type) {
    case H1:
      return classes.h1FontSize;
    case H2:
      return classes.h2FontSize;
    case H3:
      return classes.h3FontSize;
    case H4:
      return classes.h4FontSize;
    case H5:
      return classes.h5FontSize;
    case H6:
      return classes.h6FontSize;
    case TITLE:
      return classes.titleFontSize;
    default:
      return classes.h5FontSize;
  }
};

export {
  ms,
  generateFontSizes,
  generateFontClass,
  media,
  convertStyleClass,
  themeSelector,
};
