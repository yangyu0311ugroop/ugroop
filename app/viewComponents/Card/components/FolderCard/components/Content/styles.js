const styles = {
  templateFolderContentContainer: {
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
  templateItemListContainer: {
    padding: '0 24px',
    margin: '2px 0',
    '&::-webkit-scrollbar-track-piece': {
      backgroundColor: 'transparent',
      webkitBorderRadius: '6px',
    },
    fontSize: '13px',
  },
  emptyFolder: {
    margin: '16px 0',
    padding: '0 24px',
    fontSize: '13px',
  },
  templateFolderContentEmpty: {
    color: '#B0B9C3',
  },
};

export default styles;
