const stylesheet = {
  ugFolderLink: {
    display: 'inline-block',
    height: 20,
    width: '100%',
    color: 'inherit',
    '&:hover': {
      color: 'inherit',
    },
  },
  ugFolderLinkEmpty: {
    color: '#37415C',
  },
  ugTemplateFolder: {
    margin: '19px 0 0',
    position: 'relative',
  },
  ugTemplateFolderContent: {
    height: '130px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto',
  },
  ugTemplateFolderContentEmpty: {
    borderTop: 'solid 1px #e3e9ef',
  },
  ugTemplateFolderFooter: {
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ugTemplateItemFooterActions: {
    display: 'flex',
    flex: '1 0 0',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ugTemplateItemFooterActionsIcon: {
    alignSelf: 'center',
    fontSize: '20px',
    color: '#acb2c1',
    margin: '0 5px',
    '&:hover': {
      color: '#acb2c1',
    },
  },
  ugTemplateFolderOverride: {
    backgroundColor: 'white',
    opacity: 0.5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
  ugTemplateFolderLoading: {
    position: 'absolute',
    zIndex: 99999,
    top: '50%',
    left: '45%',
  },
  ugTemplateLinks: {
    textDecoration: 'none !important',
    padding: 0,
  },
};

export default stylesheet;
