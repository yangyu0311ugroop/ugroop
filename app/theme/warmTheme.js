import { createMuiTheme } from '@material-ui/core/styles';
import margins from './margins';
import { fontScale } from './scale';
import colors from './MarketingColors';

const WarmTheme = createMuiTheme({
  colorTone: 'warm',
  colors,
  margins,
  fontScale,
  overrides: {
    MuiInput: {
      // Name of the styleSheet
      root: {
        color: colors.gray,
      },
      underline: {
        '&:before': {
          backgroundColor: colors.silver,
          height: '1px',
        },
        '&:after': {
          backgroundColor: colors.dune,
        },
      },
    },
    MuiTab: {
      rootInheritSelected: {
        borderLeft: `1px solid ${colors.gray}`,
        borderRight: `1px solid ${colors.gray}`,
        borderTop: `1px solid ${colors.gray}`,
        borderRadius: '2px 2px 0 0',
      },
    },
    MuiTabs: {
      fixed: {
        '& > div:first-child': {
          borderBottom: `1px solid ${colors.gray}`,
        },
        '& > div:last-child': {
          height: '1px',
          marginTop: '-1px',
          backgroundColor: 'white',
        },
      },
    },
  },
});

export default WarmTheme;
