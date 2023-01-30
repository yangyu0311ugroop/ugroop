/**
 * Created by edil on 11/2/17.
 */
const style = {
  timeLinePreview: {
    borderRadius: 4,
    border: '1px solid rgb(209, 213, 221)',
    background: 'white',
  },
  border: {
    margin: 0,
    padding: 8,
    listStyleType: 'none',
    backgroundColor: 'transparent',
    borderTop: '1px solid rgb(209, 213, 221)',
    borderBottom: '1px solid rgb(209, 213, 221)',
    '& > li': {
      '&:first-child:before': {
        display: 'none',
      },
    },
  },
  timeLineHeader: {
    display: 'flex',
    color: '#000',
    minHeight: 400,
    boxShadow: 'none',
    fontWeight: 600,
    flexDirection: 'row',
    padding: '7px 16px',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  timeLineFooter: {
    color: '#000',
    minHeight: 40,
    fontWeight: 600,
    display: 'flex',
    boxShadow: 'none',
    flexDirection: 'row',
    padding: '0 16px',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  dateTitle: {
    fontWeight: 600,
  },
  startDate: {
    color: '#c6ccd6',
    fontWeight: 600,
  },
  endDate: {
    color: '#c6ccd6',
    fontWeight: 600,
  },
  root: {
    width: '100%',
    marginTop: 30,
  },
  flex: {
    flex: 1,
  },
  /* UIItemCell Styles */
  index: {
    width: '35px',
    height: '35px',
    fontWeight: 600,
    paddingTop: '6px',
    textAlign: 'center',
    marginRight: '8px',
    borderRadius: '50px',
    position: 'relative',
    fontFamily: 'IBM Plex Sans, sans-serif',
    color: '#c6ccd6',
    backgroundColor: '#f6f8f9',
    border: '1.5px solid #e3e9ef',
  },
  indexActive: {
    color: '#495873',
    backgroundColor: '#fff',
  },
  list: {
    padding: 8,
    boxSizing: 'border-box',
    '&:before': {
      flex: 1,
      zIndex: 0,
      left: '25px',
      bottom: '30px',
      height: '100%',
      display: 'flex',
      content: '" "',
      position: 'absolute',
      borderLeft: '1px dashed #e3e9ef',
    },
    '&:hover': {
      backgroundColor: '#f6f8fa',
    },
  },
  listItemActive: {
    backgroundColor: '#f6f8fa',
  },
  firstItem: {
    '&:before': {
      display: 'none',
    },
  },
  tooltipRoot: {
    position: 'relative',
  },

  tooltip: {
    width: 'inherit',
    zIndex: 9,

    '& [data-placement="top"]': {
      bottom: 60,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 'unset !important',
      transform: 'unset !important',
    },

    '& [data-placement="bottom"]': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '60px !important',
      transform: 'unset !important',
    },
  },
  headers: {
    width: '78%',
    '@media (max-width: 1400px)': {
      width: '63%',
    },
  },
  badge: {
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    position: 'absolute',
    backgroundColor: '#f50057',
    borderRadius: '50%',
  },
  items: {
    zIndex: 1,
    width: '100%',
    display: 'flex',
  },
  title: {
    marginTop: 0,
    fontWeight: 600,
    color: '#c6ccd6',
    textTransform: 'uppercase',
  },
  subtitle: {
    margin: 0,
    color: '#717e98',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  titleActive: {
    color: '#a7a4e5',
    fontWeight: 700,
  },
  subtitleActive: {
    fontWeight: 600,
    color: '#495873',
  },
  relative: {
    position: 'relative',
  },
  headerBadge: {
    top: -2,
    right: -11,
    width: 10,
    height: 10,
    position: 'absolute',
    backgroundColor: '#f50057',
    borderRadius: '50%',
  },
};

export default style;
