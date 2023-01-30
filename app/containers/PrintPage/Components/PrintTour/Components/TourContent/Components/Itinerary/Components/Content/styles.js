const styles = {
  dayNum: {
    fontSize: 17,
    fontColor: '#495873',
    paddingRight: 8,
    marginRight: 16,
    width: 280,
    fontWeight: 600,
  },
  daystepLine: {
    borderRight: '1px dashed green',
  },
  dayContent: {
    fontSize: 17,
    fontColor: '#495873',
    borderRight: 'solid 1px #d8d8d8',
    paddingRight: 8,
  },
  noBorder: {
    border: 'none',
  },
  noDayContent: {
    fontSize: 17,
    fontColor: '#495873',
    paddingRight: 8,
  },
  itinerary: {
    margin: 0,
  },
  firstItem: {
    content: '',
    height: 5,
    width: 5,
    backgroundColor: 'black !important',
    display: 'block',
    position: 'relative',
    right: 19,
    borderRadius: '50%',
  },
  firstItemNocontent: {
    content: '',
    height: 10,
    width: 5,
    backgroundColor: 'white !important',
    display: 'block',
    position: 'relative',
    right: 19,
  },
  middleContent: {
    content: '',
    width: 5,
  },
  lastItemNocontent: {
    content: '',
    height: 20,
    width: 5,
    backgroundColor: 'white !important',
    display: 'block',
    position: 'relative',
    right: 21,
    borderRight: '1px dashed green',
    top: -25,
  },
  lastItem: {
    content: '',
    height: 5,
    width: 5,
    backgroundColor: 'black !important',
    display: 'block',
    position: 'relative',
    right: 19,
    marginTop: 10,
    borderRadius: '50%',
  },
  date: {
    fontSize: '17px',
    lineHeight: 0,
  },
  day: {
    fontSize: '17px',
    fontColor: '#495873',
  },
  dayTitleContent: {
    fontSize: 17,
    fontColor: '#495873',
    textAlign: 'left',
    wordBreak: 'break-word',
  },
  dayNumLast: {
    border: 'none',
  },
  dayNotSet: {
    fontSize: 17,
    fontColor: '#495873',
    fontWeight: 600,
    marginRight: 16,
    paddingRight: 8,
    lineHeight: 0,
  },
};
const styleSheet = {
  ...styles,
  '@media print': {
    ...styles,
    dayNotSet: {
      paddingBottom: '2mm !important',
    },
  },
};
export default styleSheet;
