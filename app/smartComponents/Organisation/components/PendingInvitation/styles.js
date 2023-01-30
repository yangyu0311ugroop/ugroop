const styles = {
  root: {},
  info: {
    color: 'black',
    padding: '4px 8px',
  },
  content: {},
  invitees: {
    padding: 8,
    height: 290,
    maxHeight: 290,
    borderRadius: 4,
    overflowX: 'hidden',
    overflow: 'auto',
    width: '100%', // 'calc(100% + 24px)',
  },
  gridContent: {
    padding: 24,
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  grow: {
    flex: '1',
  },
  inviteeHr: {
    margin: '8px 0 0',
  },
  header: {
    fontSize: 14,
    padding: '28px 16px 0px 36px',
    fontWeight: 700,
  },
  footerLabel: {
    fontSize: 14,
    padding: '8px 0 24px 0',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 12,
    zIndex: 3,
  },
  line: {
    borderTop: 'solid 1px #e3e9ef',
    widht: '90%',
  },
  footer: {
    padding: 24,
  },
  pending: {
    marginBottom: 8,
    paddingBottom: 4,
  },
};

export default styles;
