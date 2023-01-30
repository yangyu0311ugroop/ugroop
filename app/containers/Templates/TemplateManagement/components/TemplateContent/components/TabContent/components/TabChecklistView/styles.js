const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  right: {
    width: 306,
  },
  relative: {
    position: 'relative',
    padding: 0,
  },
  leftColumn: {
    marginTop: 16,
  },
  card: {
    background: 'white',
    border: '1px solid rgb(209, 213, 221)',
    borderRadius: 4,
    padding: 16,
  },
  descriptionCard: {
    background: 'white',
    border: '1px solid rgb(209, 213, 221)',
    borderRadius: 4,
    padding: '8px 16px',
    marginBottom: 8,
    minHeight: 32,
  },
  description: {},
  descriptionHeader: {
    fontWeight: 600,
    borderBottom: '1px solid rgb(209, 213, 221)',
    padding: '8px 16px',
    color: '#595F6F',
  },
  checklistsCard: {
    marginBottom: 8,
    border: '1px solid rgba(164, 172, 186, 0.5)',
    borderRadius: 4,
    background: 'white',
  },
  marginTop: {
    marginTop: 8,
  },
  contentWidth: {
    width: '100%',
  },
  stickyGrid: {
    overflowY: 'auto',
    margin: -12,
    paddingLeft: '16px !important',
    paddingRight: '16px !important',
    paddingBottom: '16px !important',
  },
  stickyGridEdit: {
    maxHeight: 'calc(100vh - 204px)',
    padding: '16px !important',
    paddingBottom: '8px !important',
  },
  stickyGridRead: {
    maxHeight: 'calc(100vh - 152px)',
  },
  elevation: {
    boxShadow: '0 1px 3px 0 rgba(37,32,31,.3)',
    width: '100%',
  },
};

export default styles;
