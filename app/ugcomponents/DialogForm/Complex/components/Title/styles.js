/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

const stylesheet = {
  container: {
    position: 'relative',
    top: 0,
  },
  textContainer: {
    top: 0,
  },
  logoBlock: {
    display: 'block',
  },
  headingText: {
    fontWeight: 700,
    display: 'inline-block',
  },
  headingUnderline: {
    '& >span': {
      position: 'relative',
    },
    '& > span:before': {
      content: '""',
      width: '100%',
      height: '1px',
      display: 'block',
      position: 'absolute',
      bottom: -8,
      backgroundColor: '#8ABD84',
      zIndex: 1,
    },
    '& > span:after': {
      content: '""',
      width: '100%',
      height: '1px',
      display: 'block',
      backgroundColor: '#E3E9EF',
      marginTop: '3px',
    },
  },
  subheadingMargin: {},
  subheadingText: {
    color: '#717E98',
    fontWeight: 500,
  },
  headingBackground: {
    position: 'absolute',
    fontSize: '107px',
    lineHeight: '107px',
    color: '#F6F8FA',
    fontWeight: 700,
    zIndex: -1,
    top: -24,
    left: 60,
    textTransform: 'uppercase',
  },
  headingBackgroundSpan: {
    position: 'fixed',
  },
  fullWidth: {
    width: '100%',
  },
};

export default stylesheet;
