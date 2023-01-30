const styles = {
  radioGroup: {
    display: 'flex',
    borderRadius: 4,
    flexDirection: 'row',
    border: '1px solid #9e9e9e',
    '& > label:first-child': {
      borderRight: '1px solid #9e9e9e',
    },
  },
  label: {
    margin: 0,
    paddingRight: 16,
    '& > span:first-child': {
      padding: 8,
    },
    '& svg': {
      fontSize: 16,
    },
  },
};

export default styles;
