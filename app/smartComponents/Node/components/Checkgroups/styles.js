const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  checklists: {
    marginBottom: 8,
  },
  blankslate: {
    marginTop: 24,
    borderRadius: 4,
    padding: '50px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fbfcfd',
  },
  subheading: {
    color: '#76809a',
    margin: '0 0 8px',
    lineHeight: 1.6,
  },
  heading: {
    color: '#b344d',
    fontWeight: 600,
    lineHeight: 1.6,
    margin: '20px 0 8px 0',
  },
  iconContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
  },
  customIconUGPin: {
    fontWeight: 600,
    position: 'absolute',
    top: 7,
    right: 34,
    backgroundColor: '#fbfcfd',
    borderRadius: 22,
    fontSize: 35,
    lineHeight: '.5',
    zIndex: 3,
  },
  customIconFileEmpty1: {
    position: 'absolute',
    transform: 'rotate(180deg) scaleX(-1)',
    backgroundColor: '#fbfcfd',
    lineHeight: '1',
    zIndex: 2,
  },
  customIconFileEmpty2: {
    position: 'absolute',
    transform: 'rotate(180deg) scaleX(-1)',
    top: -12,
    left: -7,
    lineHeight: '1.5',
    zIndex: 1,
  },
  noChecklist: {
    padding: '8px 40px',
  },
  headerOption: {
    margin: '0 0 4px 0',
    // background: '#e3eaf0',
    // paddingBottom: 6,
    padding: '4px 0px',
  },
  stickyBackground: {
    background: '#e3eaf0',
    border: 'solid 1px #e3e9ef',
  },
  hideTopOfSticky: {
    position: 'absolute',
    marginBottom: -10,
    width: '100%',
    top: -15,
    height: 15,
    background: '#f6f8fa',
    borderColor: '#f6f8fa',
  },
  headerDetail: {
    flex: 1,
  },
  menuIcon: {
    color: '#0a2644',
  },
  marginBottom: {
    marginBottom: 8,
  },
  label: {
    whiteSpace: 'nowrap',
  },
  option: {
    background: 'white',
    // zIndex: 9999,
  },
  noTextWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
