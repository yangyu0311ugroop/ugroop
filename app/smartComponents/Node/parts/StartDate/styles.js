const style = {
  root: {},
  grow: {
    flex: '1',
  },
  popper: {
    zIndex: 1299,
  },
  default: {},
  dayMode: {
    // border: '1px solid rgb(209, 213, 221)',
  },
  calendarBlock: {
    // padding: 8,
    padding: '4px 0',
    textAlign: 'center',
    minWidth: 50,
    overflow: 'hidden',
    borderRadius: 0,
  },
  calendarBlockEdit: {
    '&:hover': {
      background: 'whitesmoke',
    },
  },
  blockNoDate: {},
  calendarFirstRow: {
    textTransform: 'uppercase',
    color: '#fa3e3e',
    fontSize: 12,
  },
  firstRowWeekend: {
    background: '#F44336',
  },
  firstRowNoDate: {
    // background: 'unset',
    // borderBottom: '1px solid #FFFFFF50',
  },
  calendarSecondRow: {
    color: '#1a2b49',
    fontSize: 24,
    marginTop: -8,
    marginBottom: -8,
    fontWeight: 300,
  },
  calendarThirdRow: {
    color: '#FF5722',
  },
  thirdRowWeekend: {
    color: '#FF5722',
  },
  dotted: {
    // borderTop: '1px dotted gainsboro',
    color: '#FF5722',
    fontSize: 12,
    marginTop: -4,
  },
  calendarThirdRowGrid: {},
  secondRowNoDate: {},
  secondRowWeekDay: {
    fontSize: 14,
    padding: '12px 0',
  },
  dow: {},
  weekday: {
    padding: '2px 4px',
    fontWeight: 500,
    color: '#4571ce',
  },
  weekend: {
    color: '#FF5722',
  },
  blockDense: {
    minWidth: 'unset',
  },
  firstRowDense: {
    padding: 4,
  },
  secondRowDense: {
    fontSize: 18,
  },
  countdown: {
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '0.1em 0.5em',
    margin: '0 0.2em',
    boxShadow: '0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset',
    backgroundColor: '#f7f7f7',
  },

  countdownBlock: {
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  countdownHover: {
    cursor: 'pointer',
    borderRadius: 4,

    '&:hover': {
      background: '#f7f7f730',
    },
  },

  rowOne: {
    textTransform: 'uppercase',
    color: '#fa3e3e',
    fontSize: 12,
    wordBreak: 'normal',
  },
  rowTwo: {
    color: '#1a2b49',
    fontSize: 16,
    marginTop: -14,
  },

  next2Mo: {
    color: '#00aa3c',
  },
  nextWeek: {
    color: '#ff5722',
    fontWeight: 500,
  },
  ongoingBadge: {
    background: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 3,
    color: 'white',
    padding: '2px 8px',
    boxShadow: '0px 0px 5px 1px rgba(224, 224, 224, 0.5)',
    position: 'absolute',
    top: 17,
    left: 16,
  },
  live: {
    background: '#F44336',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
    padding: '0 2px',
    borderRadius: 4,
    marginTop: -4,
  },
  ongoing: {
    color: '#F44336',
  },
  past: {
    background: 'grey',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
    padding: '0 2px',
    borderRadius: 4,
    marginTop: -4,
  },
  thedot: {
    fontWeight: 'bold',
    marginRight: 2,
    fontSize: 18,
    maxHeight: 16,
    marginTop: -12,
  },
  thedotL: {
    fontWeight: 'bold',
    marginRight: 2,
    fontSize: 18,
    maxHeight: 16,
    marginTop: -12,

    animation: 'blinking 2s infinite',
  },
  liveBadge: {
    marginRight: 0,
    marginTop: 0,
  },
};
// override default media print styles
const mediaPrint = {
  calendarFirstRow: {
    color: 'white !important',
    background: '#658ee6 !important',
    marginBottom: 0,
    padding: '4px 0',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  calendarSecondRow: {
    background: 'white !important',
    color: '#0a2644 !important',
    fontSize: 24,
    lineHeight: 1.5,
  },
  calendarThirdRow: {
    background: 'white !important',
    color: '#4571ce !important',
  },
  thirdRowWeekend: {
    color: '#FF5722 !important',
  },
  dotted: {
    // borderTop: '1px dotted gainsboro',
    color: '#FF5722 !important',
    fontSize: 12,
    marginTop: -4,
    fontWeight: 500,
  },
  calendarThirdRowGrid: {
    color: 'white !important',
    fontWeight: 500,
  },
  secondRowNoDate: {
    background: 'unset',
    color: 'white !important',
  },
  firstRowWeekend: {
    background: '#F44336 !important',
  },
};

const styles = {
  ...style,
  '@media print': {
    ...style,
    ...mediaPrint,
  },
};

export default styles;
