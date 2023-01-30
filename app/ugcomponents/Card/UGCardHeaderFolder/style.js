export default {
  ugCardHeaderFolder: {
    height: '39px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '4px 4px 0 0',
    position: 'relative',
  },
  ugCardFolderImgList: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: 'calc(100% - 1px)',
    width: 'calc(100% - 2px)',
  },
  ugCardHeaderOverlay: {
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 1px)',
    left: '0',
    right: '0',
    margin: '0 auto',
    borderRadius: '4px 4px 0 0',
    boxSizing: 'content-box',
    borderBottom: '1px solid #E3E9EF',
    background: 'white',
  },
  ugCardFolderHeader: {
    overflow: 'hidden',
    padding: '10px 24px 2px 28px',
    position: 'absolute',
    bottom: 0,
    zIndex: '99',
    width: '100%',
    height: '100%',
    borderBottom: '1px solid #E3E9EF',
    background:
      'linear-gradient(rgba(77, 103, 167, 0.05) 50%, rgba(30, 37, 67, 0.71))',
    '& h4': {
      fontSize: '14px',
    },
  },
  ugCardHeaderFolderImg: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    '&:not(:first-child)': {
      height: 14,
    },
    '&:last-child': {
      top: -15,
    },
    '&:not(:first-child) > div': {
      border: '1px solid #E3E9EF',
      backgroundColor: '#F6F8FA',
    },
    '&:not(:first-child):not(:last-child)': {
      top: -8,
      height: 12,
    },
  },
  ugCardHeaderFolderAction: {
    position: 'absolute',
    zIndex: 999,
    right: '10px',
    bottom: '0',
    display: 'flex',
    '& > *': {
      marginRight: '15px',
      color: 'white',
    },
  },
  ugCardFolderTemplateCount: {
    alignSelf: 'center',
    fontWeight: 800,
    fontSize: '0.85em',
  },
  ugCardFolderMenu: {
    fontSize: '1.5em',
    '& i': {
      verticalAlign: 'text-top',
    },
  },
  ugCardFolderTitle: {
    padding: '0',
    margin: '0',
    fontWeight: 600,
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  ugCardFolderTitleEmpty: {
    color: '#37415C',
    padding: '0',
    margin: '0',
    fontWeight: 600,
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  ugCardFolderHeaderEmpty: {
    background: 'white',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
};
