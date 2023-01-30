const styles = ({ breakpoints }) => ({
  root: {},
  grow: {
    flex: '1',
  },

  label: {
    color: '#495873',
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 30,
  },

  input: {
    minHeight: 100,
  },
  newtourEllipsis: {
    width: 250,
  },
  selectedContainer: {
    [breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  weekday: {
    padding: '2px 4px',
    fontWeight: 500,
    color: '#4571ce',
  },
  weekend: {
    color: '#FF5722',
  },
  selectedDay: {
    border: 'solid 1px',
  },
  datePicker: {
    '& input': {
      backgroundColor: 'transparent',
    },
    height: 'inherit',
  },
  dateInput: {
    minHeight: 80,
  },
  icon: {
    width: 32,
    height: 32,
    color: '#FFA500 !important',
  },
  stepContent: {
    paddingLeft: 55,
    cursor: 'unset',
    marginLeft: 16,
  },
  stepVerical: {
    marginLeft: 4, // '16px !important',
  },
  calendarBtn: {
    position: 'relative',
    top: 12,
    right: 16,
  },
  content: {
    paddingTop: '0px',
  },
});

export default styles;
