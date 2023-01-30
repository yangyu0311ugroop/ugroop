/**
 *  -----------------------------
 *  -      FONT GUIDELINES      -
 *  -----------------------------
 *  Font  - Font-sizes -  Margin
 *  H1    -    43px    -  40px 0
 *  H2    -    30px    -  32px 0
 *  H3    -    25px    -  24px 0
 *  Title -    24px    -  20px 0
 *  H4    -    17px    -  16px 0
 *  H5    -    14px    -   8px 0
 *  H6    -    12px    -   4px 0
 *  P     -     H5     -    H5
 *  Span  -     H5     -  inherit
 *  -----------------------------
 *  -           PROPS           -
 *  -----------------------------
 *  error (boolean)
 *  success (boolean)
 *  textAlign (string)
 *  letterSpace (boolean)
 *  dense or noMargin (boolean)
 *  transform (string)
 *  weight (string): light, bold, bolder, black
 *  -----------------------------
 */

import {
  H1 as h1,
  H2 as h2,
  H3 as h3,
  H4 as h4,
  H5 as h5,
  H6 as h6,
  P as p,
  SPAN as span,
  TITLE as title,
} from 'utils/constants/fontTypes';
import React from 'react';
import Typography from './components/Typography';

export const H1 = props => <Typography type={h1} {...props} />;
export const H2 = props => <Typography type={h2} {...props} />;
export const H3 = props => <Typography type={h3} {...props} />;
export const H4 = props => <Typography type={h4} {...props} />;
export const H5 = props => <Typography type={h5} {...props} />;
export const H6 = props => <Typography type={h6} {...props} />;
export const Title = props => <Typography type={title} {...props} />;
export const Span = props => <Typography type={span} {...props} />;

// technically the default one
export const P = props => <Typography type={p} {...props} />;

// For Testing Purposes
export const TypographyList = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Title,
  Span,
};

export default P;
