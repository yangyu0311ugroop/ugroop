export default {
  appBar: {
    backgroundColor: 'white',
    boxShadow: 'none',
    '&::after': {
      content: '" "',
      width: '100%',
      height: 1,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#edf2f4',
    },
  },
  shadow: {},
  toolbar: {
    padding: 0,
    minHeight: 0,
    display: 'flex',
    alignItems: 'flex-end',
  },
  tabs: {
    flex: 1,
  },
  tabButtons: {
    flex: 'none',
  },
  tabItem: {
    margin: 0,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: '600',
    maxWidth: 'unset',
    minWidth: 'unset',
    color: '#b0b9c3',
    backgroundColor: '#f6f8fa',
    borderTop: 'solid 1px #e3e9ef',
    borderLeft: 'solid 1px #e3e9ef',
    borderRight: 'solid 1px #e3e9ef',
    marginRight: 4,
  },
  firstTabItem: {
    borderTopLeftRadius: 4,
  },
  lastTabItem: {
    borderTopRightRadius: 4,
    borderRight: 'solid 1px #e3e9ef',
    margin: 0,
  },
  tabItemNoColor: {
    backgroundColor: 'transparent',
    border: '0px solid #fff',
  },
  tabOptions: {
    display: 'flex',
    alignItems: 'center',
  },
  tabOptionsMarginBottom: {
    marginBottom: -7,
  },
  iconBtnAdd: {
    backgroundColor: '#a1c99c',
    color: 'white',
    height: '38px',
    width: '110px',
    size: 'small',
    border: '1px solid #edf2f4',
    marginBottom: '23px',
  },
  iconMenu: {
    boxShadow: '0 2px 4px 0 #e3e9ef',
    height: '46px',
    width: '46px',
    border: '1px solid #edf2f4',
    marginLeft: '11px',
    marginBottom: '32px',
    '&::before': {
      top: '46px',
      flex: '1',
      left: '21px',
      width: '2px',
      height: '57%',
      display: 'flex',
      content: '" "',
      position: 'absolute',
      backgroundColor: '#edf2f4',
      zIndex: '99',
    },
  },
  iconMenuMore: {
    height: '38px',
    width: '38px',
    border: '1px solid #edf2f4',
    marginLeft: '11px',
    marginBottom: '4px',
  },
  icon: {
    fontSize: '20px',
  },
};
