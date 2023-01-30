const styles = {
  root: {},
  item: {},
  dense: {},
  card: {
    display: 'flex',
    minHeight: 120,
    maxHeight: 200,
  },
  duration: {
    fontStyle: 'italic',
  },
  iconContainer: {
    paddingTop: '4px !important',
    paddingBottom: '0px !important',
  },
  icon: {
    padding: '32px 8px',
    display: 'flex',
  },
  iconStart: {
    paddingBottom: 20,
  },
  iconEnd: {
    paddingTop: 4,
  },
  details: {
    paddingTop: 12,
    paddingRight: 8,
    width: 230,
    overflow: 'hidden',
  },
  active: {
    boxShadow: '0 4px 4px 0 #e3e9ef',
  },
  type: {
    paddingLeft: 1,
    paddingBottom: 4,
  },
  listIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '5%',
  },
  listType: {
    paddingLeft: 1,
    paddingBottom: 4,
    '& div > h6': {
      fontSize: '15px',
    },
  },
  locationCard: {
    width: '100%',
  },
  list: {
    border: '1px solid #E3E9EF',
    background: '#fbfcfd',
    width: '100%',
    borderRadius: 4,
  },
  detailList: {
    width: '100%',
  },
  firstLine: {
    flex: 1,
  },
  eventName: {
    width: '100%',
  },
  eventNameList: {
    maxWidth: 400,
  },
  eventNameListSM: {
    maxWidth: 285,
  },
  buttonList: {
    width: '100%',
    margin: 0,
  },
  location: {
    color: '#595F6F',
    // textDecoration: 'underline',
    fontSize: 12,
    margin: 0,
    textAlign: 'left',
    paddingLeft: 8,
  },
  locationsContainer: {
    width: '88%',
  },
  hidden: {
    display: 'none',
  },
  detailContainer: {},
};

export default styles;
