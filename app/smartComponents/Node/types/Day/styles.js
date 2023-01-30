const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  content: {},
  date: {
    color: '#9c9c9c',
    fontSize: 12,
  },
  subtitle: {
    color: '#595F6F',
  },
  padding: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  dayTitle: {
    color: '#fe7a5c',
  },
  btns: {
    margin: 1,
  },
  link: {
    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
    },
  },

  calendar: {
    fontSize: 14,
  },
  firstRow: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    padding: '0 8px',
    background: '#658ee6',

    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  firstRowWeekend: {
    background: '#F44336',
  },
  secondRow: {
    background: 'white',
    color: '#0a2644',
    fontSize: 15,
    letterSpacing: '-0.05em',

    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    border: '1px solid rgb(216, 218, 223)',
    borderTop: 'none',
  },
  secondRowOffset: {
    marginTop: -4,
  },
  calendarBlock: {
    minWidth: 52,
    textAlign: 'center',

    '&:hover $secondRow': {
      borderColor: 'rgba(27, 31, 35, 0.35)',
    },
  },
  offsetLeft: {
    paddingLeft: 52,
  },
};

export default styles;
