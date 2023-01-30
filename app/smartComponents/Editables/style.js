import { scalingFontSizes } from 'theme/commonStyles/scalingFontSizes';

const style = theme => ({
  root: {
    margin: '0 -2px',
  },
  relative: {
    position: 'relative',
  },
  grow: {
    flex: 1,
  },
  text: {
    padding: 0,
    margin: '0 2px',
  },
  paper: {
    overflow: 'visible',
  },
  popover: {
    paddingBottom: 52,
  },
  hidden: {
    display: 'none',
  },
  withActions: {
    display: 'flex',
  },
  clearBtn: {
    border: '1px solid #b1bac4',
  },
  actionItem: {
    right: -2,
    bottom: -36,
    zIndex: 99,
    display: 'flex',
    position: 'absolute',
  },
  inlineAction: {
    bottom: 'unset',
    top: -16,
  },
  ...scalingFontSizes(theme, false),
});

export default style;
