const styles = {
  ugTemplateFolderContentContainer: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingRight: '24px',
    boxSizing: 'content-box',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  ugTemplateItemListContainer: {
    padding: '0 24px',
    margin: '16px 0',
    '&::-webkit-scrollbar-track-piece': {
      backgroundColor: 'transparent',
      webkitBorderRadius: '6px',
    },
  },
  ugEmptyFolder: {
    margin: '16px 0',
    padding: '0 24px',
  },
  ugTemplateFolderContentEmpty: {
    color: '#B0B9C3',
  },
};

export default styles;
