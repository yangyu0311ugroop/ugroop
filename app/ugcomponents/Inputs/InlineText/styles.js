import { scalingFontSizes } from 'theme/commonStyles/scalingFontSizes';

const styles = theme => ({
  root: {
    height: 26,
  },
  grow: {
    flex: '1',
  },
  editing: {},
  input: {
    padding: 0,
    height: 'unset',
    lineHeight: 1.5,
    color: 'inherit',
  },
  text: {
    // padding: '0px 4px', should not have padding by default?
    color: 'inherit',
  },
  inkbar: {
    '&:hover::after': {
      height: '1px !important', // cant override without important
    },
    '&::after': {
      height: 1,
    },
  },
  underline: {
    '&:hover::before': {
      height: '1px !important', // cant override without important
    },
    '&::before': {
      height: 1,
    },
  },
  bgTransparent: {
    background: 'transparent',
    '&:hover::before': {
      background: 'transparent',
    },
    '&::before': {
      background: 'transparent',
    },
  },
  ...scalingFontSizes(theme, false),
});

export default styles;
