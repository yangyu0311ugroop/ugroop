const styles = ({ breakpoints }) => ({
  root: {
    padding: '16px',
  },
  dayContainer: {
    marginTop: '16px',
    border: 'solid 1px #e3e9ef',
    padding: '0 16px 0px 16px',
    background: 'white',
    borderRadius: 4,
    [breakpoints.down('sm')]: {
      paddingLeft: '44px',
      marginLeft: '12px',
      width: '96%',
    },
  },
  dayContent: {
    marginBottom: '16px',
  },
  header: {
    fontSize: '25px',
    fontWeight: '600',
    color: '#495873',
    margin: '0',
  },
  dot: {
    width: '4px',
    height: '4px',
    backgroundColor: '#86a6eb',
    borderRadius: '100%',
    margin: '0 8px',
  },
  grow: {
    flex: '1',
  },
  dayTitleContainerPadding: {
    padding: '0 8px',
    margin: '-18px 0 0 0',
    background: '#fff',
    border: '1px solid #e3e9ef',
    borderRadius: 2,
  },
  dayTitle: {
    paddingBottom: '8px',
  },
  dayLocation: {
    fontSize: '12px',
    color: '#8490a9',
    fontWeight: '600',
    margin: '0',
  },
  editBtn: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#495873',
    fontSize: '17px',
    fontWeight: '600',
    marginBottom: '0px',
    paddingLeft: 17,
  },
  heading: {
    paddingTop: 0,
  },
  timeline: {
    paddingLeft: '16px',
  },
});

export default styles;
