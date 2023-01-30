const styles = {
  root: {
    '& > div': {
      margin: '0px 0px 0px 1px',
      padding: '2px 0px 0px',
    },
    '& > .react-phone-number-input__row:before': {
      visibility: 'hidden',
    },
    '& > .react-phone-number-input__row > .react-phone-number-input__country--native': {
      alignItems: 'flex-start',
      marginTop: 4,
    },
    '& > .react-phone-number-input__row > .react-phone-number-input__input': {
      height: 'calc(0.53rem * 6)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      paddingBottom: 16,
      paddingTop: 8,
      '&:hover': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
      },
      '&:focus': {
        borderBottom: '1px solid #303f9f',
      },
    },
  },
  inline: {
    '& > .react-phone-number-input__row > .react-phone-number-input__input': {
      padding: 0,
    },
  },
  fullWidth: {
    width: '100%',
  },
  readOnly: {
    '& .react-phone-number-input__country--native': {
      marginRight: 4,
    },
    '& .react-phone-number-input__country-select': {
      cursor: 'unset',
    },
    '& .react-phone-number-input__country-select-arrow': {
      visibility: 'hidden',
      margin: 0,
    },
    '& > div': {
      padding: 0,
      '&:before': {
        height: 0,
      },
      '&:hover': {
        '&:before': {
          height: 0,
        },
      },
    },
  },
  error: {
    '& > .react-phone-number-input__row > .react-phone-number-input__input': {
      borderBottom: '1px solid #ff1744',
      '&:hover': {
        borderBottom: '1px solid #ff1744',
      },
      '&:focus': {
        borderBottom: '1px solid #ff1744',
      },
    },
  },
  labelRoot: {
    fontWeight: 'unset',
  },
  labelRootActive: {
    color: '#303f9f',
  },
  labelRootError: {
    color: '#ff1744',
    '&:hover': {
      color: '#ff1744',
    },
    '&:focus': {
      color: '#ff1744',
    },
  },
};

export default styles;
