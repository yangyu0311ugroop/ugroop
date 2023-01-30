const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  blankslate: {
    marginTop: 8,
    borderRadius: 4,
    paddingBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: '#fbfcfd',
  },
  iconContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
  },
  subheading: {
    color: '#76809a',
    margin: '0 0 4px',
    lineHeight: 1.6,
  },
  heading: {
    color: '#b344d',
    fontWeight: 600,
    lineHeight: 1.6,
    margin: '4px 0 4px 0',
  },
  content: {
    color: '#343434',
  },
  completedMessage: {
    padding: '2px 0 2px 32px',
  },
  padding: {
    padding: 8,
    paddingLeft: 0,
  },
  status: {
    color: 'grey',
    cursor: 'pointer',
    minHeight: 42,

    '&:hover': {
      backgroundColor: '#f6f8fa50',
    },
  },
  statusCollapsed: {
    border: '1px solid transparent',
  },
  statusExpanded: {
    backgroundColor: '#ffffff',
    padding: '8px 8px',
    borderRadius: 4,

    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  contentGrid: {
    background: 'white',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  contentGridNoBackground: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  border: {},
  noData: {
    padding: '5px 16px',
  },
  progress: {
    marginLeft: 8,
    marginRight: 16,
  },
  underline: {
    textDecoration: 'underline',
  },
  smallText: {
    fontSize: 12,
    padding: '0px 8px',
    minHeight: 'unset',
  },
  addButton: {
    width: 32,
    height: 32,
    position: 'relative',
    color: '#bdc6ce',
    paddingTop: 1,
    paddingLeft: 8,
    zIndex: 1,

    '&:hover': {
      color: 'gray',
    },
    '&:hover $plusIcon': {
      color: 'gray',
      border: '1px solid gray',
    },
  },
  plusIcon: {
    background: '#ffffffd9',
    border: '1px solid #bdc6ce',
    borderRadius: '50%',
    color: '#bdc6ce',
    lineHeight: '10px',
    paddingLeft: 1,

    position: 'absolute',
    bottom: 5,
    right: 5,

    '& i': {
      fontSize: 10,
    },
  },
  pinIcon: {
    color: '#bf1750',
    position: 'absolute',
    fontSize: 13,
    left: 18,
    zIndex: 9,
    borderRadius: '50%',
    lineHeight: '13px',
    paddingLeft: 1,
    bottom: 19,
    fontWeight: 100,
    // right: 5,
  },
  postIcon: {
    background: '#ffffcd',
    position: 'relative',
    left: '-2px',
    top: '2px',
    // fontSize: 22,
  },
  checkBoxRoot: {
    height: 'unset',
    width: 'unset',
    margin: '0px 2px',
    position: 'relative',
    // top: '-4px',
    lineHeight: 1,
    padding: 0,
  },
  folderIcon: {
    paddingRight: 8,
    /* position: 'relative',
    top: '-4px', */
  },
  contentEdit: {
    flex: 1,
  },
  addLeftPaddingChecklist: {
    marginLeft: 5,
  },
  contentList: {
    fontSize: 12,
  },
  item: {
    padding: '4px 16px',
    cursor: 'pointer',
    // marginLeft: 2,

    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) border-top-color, 400ms cubic-bezier(.08,.52,.52,1) border-top-color, 400ms cubic-bezier(.08,.52,.52,1) opacity',

    '&:hover': {
      backgroundColor: '#fafbfc',
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      zIndex: 2,
    },
  },
  listPrefix: {
    color: '#777',
    fontSize: 10,
  },
  shiftUp: {
    marginBottom: 8,
  },
  headerToggleSort: {
    background: 'white',
    borderTop: '1px solid #e3e9ef',
    padding: '0px 16px',
  },
  taskHeaderMaster: {
    paddingTop: 4,
  },
  closeButton: {
    fontSize: 12,
  },
  selected: {
    // marginLeft: -2,
    // color: '#fe7a5c',
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',
    boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',

    '&:hover': {
      cursor: 'unset',
    },
  },
  active: {
    color: '#0146da',
  },
  firtColumnHeaderMaster: {
    width: 110,
  },
};

export default styles;
