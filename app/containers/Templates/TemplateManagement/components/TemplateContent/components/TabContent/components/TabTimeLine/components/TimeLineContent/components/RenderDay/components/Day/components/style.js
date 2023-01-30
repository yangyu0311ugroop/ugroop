import { EVENT_ICON_SIZE } from 'containers/Templates/TemplateManagement/components/Event/constants';

export const dayContentStyles = {
  actionButton: {
    background: 'white',
    color: '#0a2644',
    minHeight: 30,
    padding: '2px 12px',
    paddingTop: 4,
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  urlStyles: {
    color: '#595F6F',
    // fontSize: 12,
    lineHeight: 1.6,
    cursor: 'pointer',
  },
  clickableTitle: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  hr: {
    marginTop: 4,
    marginBottom: 4,
  },
  placeholderText: {
    color: '#595F6F',
  },
  dayContent: {
    // marginBottom: 4,
    // marginTop: -10,
  },
  offsetLeft: {
    // marginLeft: -4,
  },
  offsetRight: {
    // marginRight: 4,
  },
  size: {
    height: 140,
    width: 140,
    border: '1.7px solid transparent', // set invisible border, so image is not wiggling when switch to edit mode
    overflow: 'hidden',
  },
  grow: {
    flex: 1,
  },
  dayContentGrid: {
    // padding: '0 8px 0 0 !important',
  },
  editModeGrid: {},
  borderRadius: {
    borderRadius: '2%',
  },
  imageContainer: {
    cursor: 'pointer',
    // marginRight: 8,
  },
  placeholderIcon: {
    fontSize: 24,
  },
  upload: {
    color: '#acb3c0',
  },
  label: {
    height: 'inherit',
    width: 'inherit',
    display: 'flex',
    color: '#acb3c0',
    cursor: 'pointer',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > i': {
      fontSize: 32,
    },
  },
  dayTitle: {
    fontWeight: 600,
    wordBreak: 'break-word',
  },
  location: {
    paddingLeft: 0,
  },
  dayContentTitle: {
    flex: '1',
    margin: 0,
    color: '#202840',
  },
  editModeInput: {
    // paddingLeft: 8,
  },
  inputText: {
    '& > label': {
      fontSize: '16px',
    },
  },
  cropper: {
    marginTop: 0,
  },
  description: {
    background: 'white',
    padding: 0,
    // paddingTop: 8,
    // paddingLeft: 8,
  },
  placeholderGrid: {
    // marginRight: 8,
  },
  placeholderRoot: {
    // backgroundColor: '#fafbfc',
    // padding: '4px 12px 4px 10px',
    // marginLeft: -20,
    // width: 'calc(100% + 40px)',
    // borderBottom: 'solid 1px #e3e9ef',
  },
  blankSlate: {
    width: '100%',
    padding: 8,
    marginTop: -4,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f8fa',
    borderRadius: 4,
    '& h5': {
      color: '#495873',
    },
    '& button': {
      minWidth: 90,
      height: 38,
      margin: 0,
    },
  },
  blankSlateText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  paddingLeft: {
    paddingLeft: '46px',
  },
  previewModal: {
    width: 800,
    maxWidth: 'unset',
    maxHeight: 'unset',
    overflow: 'hidden',
  },
  customDialog: {
    width: 800,
    maxWidth: 'unset',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 12,
    zIndex: 3,
    '& i': {
      color: '#ffffff',
      textShadow: '0 0 1px #727272',
    },
  },
  paper: {
    maxWidth: 'unset',
    overflow: 'hidden',
  },
  dayContentWdith: {
    width: '100%',
  },
  buttons: {
    marginTop: 8,
  },
  paddingTop: {
    paddingTop: 8,
  },
};

export const dayToolBarStyle = ({ colors }) => ({
  root: {
    display: 'flex',
    marginTop: -15,

    '& > button': {
      margin: '0 4px',
    },
    '& > button:first-child': {
      marginLeft: 0,
    },
    '& > button:last-child': {
      marginRight: 0,
    },
  },
  addButton: {
    width: 'unset',
    fontWeight: 'unset',
    color: 'rgba(76, 86, 115, 1)',
    textTransform: 'unset',
    fontSize: 12,
    borderRadius: 4,
    height: 'unset',
    padding: 8,
  },
  noChanges: {
    fontWeight: 600,
    marginRight: 16,
    color: '#acb2c1',
  },
  bg: {
    background: colors.offwhite,
  },
  menuItemHeader: {
    backgroundColor: '#fbfcfd',
    cursor: 'unset',

    '&:hover': {
      backgroundColor: '#fbfcfd',
    },
  },
  menuItemText: {
    paddingLeft: 12,
    minWidth: 120,
  },
  menuHeader: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  button: {
    margin: 0,
    padding: 0,
    minWidth: 0,
    height: '40px',
    width: '40px',
    borderRadius: '100%',
    border: '1px solid rgba(27, 31, 35, 0.2)',
    boxShadow: '0 0 4px #c8c8c830',
    backgroundColor: '#eff3f6',
    backgroundImage: 'linear-gradient(-180deg, #ffffff 0%, #fafafa 90%)',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '& i': {
      color: 'rgba(76, 86, 115, 0.5)',
    },

    '&:hover': {
      border: '1px solid rgba(27, 31, 35, 0.35)',
      backgroundColor: '#e6ebf1',
      backgroundImage: 'linear-gradient(-180deg, #f2f2f2 0%, #eeeeee 90%)',
    },
    '&:hover i': {
      color: 'rgba(76, 86, 115, 0.7)',
    },
  },
  saveButton: {
    border: 'none',
    background: '#a1c99c',
    margin: 0,
    padding: 0,
    minWidth: 0,
    height: '40px',
    width: '40px',
    borderRadius: '100%',
    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& > i': {
        color: '#FFF',
      },
    },
    '&:hover, :focus': {
      background: '#a1c99c',
      margin: 0,
      padding: 0,
      minWidth: 0,
      height: '40px',
      width: '40px',
      borderRadius: '100%',
      border: '1px solid #e3e9ef',
      '& > span': {
        '& > i': {
          color: '#FFF',
        },
      },
    },
  },
  moveButton: {
    minWidth: 50,
    paddingBottom: '4px',
    border: '1px solid #ccc',
  },
  moveButtonLeft: {
    borderRight: 'none',
  },
  headlineText: {
    '& h5': {
      textAlign: 'center',
    },
  },
  badge: {
    margin: '8px 10px',
    width: 10,
    height: 10,
  },
});

export const dayContainerStyle = {
  root: {},
  separator: {
    width: '1px',
    height: EVENT_ICON_SIZE,
    borderRight: '1px solid #a3a9af',
  },
  multiDayList: {
    left: -52,
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  grow: {
    flex: 1,
    width: '100%',
  },
  normalWidth: {
    width: '100%',
  },
  checklist: {
    marginTop: 10,
  },
  expansionPanel: {
    boxShadow: 'unset',
  },
  checklistDay: {
    marginTop: 16,
  },
  checklistNoBorder: {
    border: 0,
  },
  checklists: {
    marginBottom: 8,
    border: '1px solid rgba(164, 172, 186, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
};
