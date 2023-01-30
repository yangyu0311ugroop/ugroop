const styles = ({ breakpoints }) => ({
  root: {
    margin: '0 24px',
  },
  grow: {
    flex: 1,
  },
  actionsRoot: {
    margin: '16px 0px',
  },
  h1: {
    marginTop: 24,
    marginBottom: 4,
    color: '#202840',
  },
  submitBtn: {
    marginRight: 8,
  },
  selfTravelCheckbox: {
    height: 32,
    color: '#47943c!important',
  },
  green: {
    color: '#47943c',
  },
  travelBtns: {
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  travelBtn: {
    margin: 0,
    marginRight: 8,
    padding: '0 8px',
    [breakpoints.down('xs')]: {
      width: '100%',
      minHeight: '40px',
      marginBottom: '8px',
    },
  },
  travelItemRoot: {
    marginTop: 24,
  },
  travelRoot: {
    padding: 16,
    paddingTop: 24,
    border: 'solid 1px #e3e9ef',
  },
  header: {
    margin: '-43px 0 0',
    position: 'relative',
  },
  headerNum: {
    zIndex: 1,
    padding: '0 8px',
    position: 'absolute',
    backgroundColor: '#FFF',
  },
  selfTravel: {
    marginTop: 8,
  },
  containerGreen: {
    position: 'relative',
    backgroundColor: '#89bc83',
    padding: 20,
    marginTop: 80,
    marginBottom: 448,
  },
  containerCircleWithLogo: {
    float: 'left',
    left: 'calc(50% - 50px)',
    width: 100,
    zIndex: 1,
  },
  containerLogo: {
    textAlign: 'center',
    position: 'absolute',
    color: '#414141',
    fontWeight: 600,
    top: 'calc(-19%)',
    left: 'calc(44%)',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    boxShadow: '0 5px 2px #888888',
    lineHeight: '100px',
    width: 100,
    height: 100,
  },
  containerXSLogo: {
    textAlign: 'center',
    position: 'absolute',
    color: '#414141',
    fontWeight: 600,
    top: 'calc(-19%)',
    left: 'calc(40%)',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    boxShadow: '0 5px 2px #888888',
    lineHeight: '100px',
    width: 100,
    height: 100,
  },
  containerBody: {
    marginTop: 60,
    textAlign: 'center',
    padding: '0 45px 0 45px',
  },
  firstParagraph: {
    color: '#ffffff',
  },
  secondParagraph: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
    display: 'block',
  },
  secondParagraphNoMargin: {
    color: '#ffffff',
    textDecoration: 'underline',
  },
});

export default styles;
