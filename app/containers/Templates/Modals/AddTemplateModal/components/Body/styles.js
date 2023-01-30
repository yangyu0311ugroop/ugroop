const stylesheet = ({ colors }) => ({
  label: {
    color: '#495873',
    fontWeight: '600',
    paddingTop: '16px',
  },
  datePicker: {
    '& input': {
      backgroundColor: 'transparent',
    },
    height: 'inherit',
  },
  clearLineBtn: {
    position: 'absolute',
    right: '0',
    bottom: 4,
    color: colors.gray,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  selectSpecific: {
    width: '100%',
    position: 'relative',
    height: 'inherit',
    '& > div': {
      marginTop: '4px !important',
    },
    '& > div > div > div': {
      paddingTop: '8px',
      backgroundColor: 'transparent',
      '& ~ svg': {
        display: 'none',
      },
    },
  },
  middleOr: {
    alignSelf: 'flex-end',
    '& > p': {
      textAlign: 'center',
    },
  },
  inputText: {},
  durationInput: {
    width: '50%',
    height: 'auto',
  },
  dateError: {
    color: 'red',
  },
  editor: {
    '& div[class^=ql-editor]': {
      maxHeight: '94px',
    },
  },
});

export default stylesheet;
