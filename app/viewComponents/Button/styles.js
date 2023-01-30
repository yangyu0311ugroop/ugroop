const styles = ({ colors, paddings }) => ({
  root: {
    margin: '16px 0px',
    borderRadius: 4,
    fontWeight: 600,
    minWidth: 'unset',
    minHeight: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textTransform: 'none',
    fontFamily: 'IBM Plex Sans, sans-serif',
    '&:disabled': {
      '&:after': {
        content: '""',
        top: 0,
        left: 0,
        borderRadius: 4,
        position: 'absolute',
        width: '100%',
        height: 'calc(100% + 1px)',
        backgroundColor: colors.button.disabled,
      },
    },
  },

  iconRoot: {
    display: 'flex',
    borderRadius: '50%',
    textDecoration: 'none',
  },

  square: {
    borderRadius: 4,
  },

  verySquare: {
    borderRadius: 0,
  },

  outline: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.button.outlineBoxShadow}`,
    '&:hover': {
      background: '#f0f2f5',
    },
  },

  standard: {
    color: colors.white,
    '&:disabled': {
      color: colors.white,
    },
  },

  borderless: {},

  borderlessBase: {
    color: colors.base,
    '&:disabled': {
      color: colors.base,
    },
  },
  borderlessPrimary: {
    color: colors.primary,
    '&:disabled': {
      color: colors.primary,
    },
  },
  borderlessAlert: {
    color: colors.alert,
    '&:disabled': {
      color: colors.alert,
    },
  },
  borderlessGray: {
    color: colors.gray,
    '&:disabled': {
      color: colors.gray,
    },
  },
  borderlessYellow: {
    color: colors.ratingSelected,
    '&:disabled': {
      color: colors.ratingSelected,
    },
    '&:hover': {
      color: colors.ratingHovered,
    },
  },
  borderlessPending: {
    color: colors.pending,
    '&:disabled': {
      color: colors.pending,
    },
  },

  standardBase: {
    backgroundColor: colors.base,
    boxShadow: `0 1px 0 0 ${colors.button.defaultActive}`,
    '&:hover': {
      backgroundColor: colors.base,
    },
    '&:active': {
      backgroundColor: colors.button.defaultActive,
    },
    '&:disabled': {
      backgroundColor: colors.baseDisabled,
      boxShadow: `0 1px 0 0 ${colors.baseDisabled}`,
    },
  },
  standardPrimary: {
    backgroundColor: colors.primary,
    boxShadow: `0 1px 0 0 ${colors.button.primaryActive}`,
    '&:hover': {
      backgroundColor: '#4CAF50',
    },
    '&:active': {
      backgroundColor: '#469849',
    },
  },
  standardAlert: {
    backgroundColor: colors.alert,
    boxShadow: `0 1px 0 0 ${colors.button.alertActive}`,
    '&:hover': {
      backgroundColor: colors.alertHover,
    },
    '&:active': {
      backgroundColor: colors.button.alertActive,
    },
  },
  standardGray: {
    backgroundColor: colors.gray,
    boxShadow: `0 1px 0 0 ${colors.gray}`,
    '&:hover': {
      backgroundColor: '#898f96',
    },
    '&:active': {
      backgroundColor: colors.gray,
    },
  },
  standardBlack: {
    backgroundColor: colors.black,
    boxShadow: `0 1px 0 0 ${colors.black}`,
    '&:hover': {
      backgroundColor: colors.black,
    },
    '&:active': {
      backgroundColor: colors.black,
    },
  },
  standardPending: {
    backgroundColor: colors.pending,
    boxShadow: `0 1px 0 0 #92915a`,
    '&:hover': {
      backgroundColor: colors.pending,
    },
    '&:active': {
      backgroundColor: colors.pending,
    },
  },

  outlineBase: {
    color: colors.base,
    '&:disabled': {
      color: colors.base,
    },
  },
  outlinePrimary: {
    color: '#2F8532',
    '&:disabled': {
      color: '#2F8532',
    },
  },
  outlineAlert: {
    color: colors.alert,
    '&:disabled': {
      color: colors.alert,
    },
  },
  outlineGray: {
    color: colors.gray,
    '&:disabled': {
      color: colors.gray,
    },
  },
  outlineDarkgray: {
    color: colors.darkgray,
    '&:disabled': {
      color: colors.darkgray,
    },
  },
  outlineBlack: {
    color: colors.black,
    '&:disabled': {
      color: colors.black,
    },
  },
  outlineYellow: {
    color: colors.ratingSelected,
    '&:disabled': {
      color: colors.ratingSelected,
    },
    '&:hover': {
      color: colors.ratingHovered,
    },
  },
  outlinePending: {
    color: colors.pending,
    '&:disabled': {
      color: colors.pending,
    },
  },

  base: {
    padding: paddings.button.base,
  },
  xs: {
    padding: paddings.button.xs,
    margin: 0,
  },
  xxs: {
    padding: paddings.button.xs,
    margin: 0,
  },
  small: {
    padding: paddings.button.small,
  },
  large: {
    padding: paddings.button.large,
  },
  extraSmall: {
    padding: paddings.button.xs,
  },

  baseIcon: {
    padding: paddings.iconButton.base,
  },
  smallIcon: {
    padding: paddings.iconButton.small,
  },
  largeIcon: {
    padding: paddings.iconButton.large,
  },
  extraSmallIcon: {
    minHeight: 'unset',
    padding: paddings.iconButton.xs,
  },

  inline: {
    margin: 0,
    padding: paddings.button.inline,
    fontWeight: 'unset',
    lineHeight: 'unset',
    minWidth: 'unset',
    minHeight: 24,
    verticalAlign: 'unset',
    backgroundColor: 'transparent',
    boxShadow: 'unset',
  },

  loading: {
    color: 'transparent',
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  },

  loadingChild: {
    color: 'transparent',
  },

  loadingSpan: {
    position: 'absolute',
    animation: 'spin 1.5s linear infinite',
  },

  '@keyframes spin': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  dense: {
    margin: 0,
  },
  block: {
    display: 'block',
    width: '100%',
  },

  light: {
    fontWeight: 200,
  },

  normal: {
    fontWeight: 400,
  },

  bold: {
    fontWeight: 600,
    '& > span > i': {
      fontWeight: 600,
    },
  },

  strong: {
    fontWeight: 900,
  },

  noMargin: {
    margin: 0,
  },

  noPadding: {
    padding: 0,
  },

  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textAlignRight: {
    textAlign: 'right',
  },

  transparent: {
    backgroundColor: 'unset',
    '&:hover': {
      backgroundColor: 'unset',
    },
  },

  standardXs: {
    minHeight: 30,
  },
  standardNormal: {
    background: 'white',
    border: '1px solid #dbdee4',
    color: '#0a2644',
    minHeight: 30,

    '&:hover': {
      background: '#ebedf0',
    },
  },
  standardWhite: {
    color: 'white',
    padding: '2px 12px',

    '&:hover': {
      background: '#5b5d60',
    },
  },
  standardInline: {
    color: '#0a2644',
    minHeight: 30,

    '&:hover': {
      background: '#ebedf0',
    },
  },
  dialog: {
    margin: 0,
    padding: '4px 8px',
    fontWeight: 500,
    minWidth: 150,
    borderRadius: 50,
  },
  noBoxShadow: {
    boxShadow: 'unset',
  },
  noBorderRadius: {
    borderRadius: 0,
  },
  buttonText: {
    fontSize: '13px',
  },
});

export default styles;
