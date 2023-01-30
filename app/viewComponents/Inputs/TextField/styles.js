const styles = ({ colors, paddings }) => ({
  root: {
    '& > label': {
      margin: 0,
      marginTop: -4,
      minWidth: 'unset',
      minHeight: 24,
      boxShadow: 'unset',
      fontWeight: 'unset',
      lineHeight: 'unset',
      verticalAlign: 'unset',
      backgroundColor: 'transparent',
    },
    '& > div > input': {
      paddingTop: paddings.textField.inputPadding.top,
      paddingBottom: paddings.textField.inputPadding.bottom,
    },
    '& > div:after': {
      backgroundColor: colors.base,
    },
    '& > p:before': {
      display: 'none',
    },
  },
  error: {
    '& > div:after': {
      backgroundColor: colors.alert,
    },
    '& > p': {
      color: colors.alert,
      margin: 0,
      fontSize: 12,
      textAlign: 'left',
      marginTop: 8,
      minHeight: '1em',
      lineHeight: '1em',
      fontWeight: 400,
      marginBottom: 2,
    },
  },
});

export default styles;
